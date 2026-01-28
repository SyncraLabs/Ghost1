
import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, unlink } from 'fs/promises';
import { join } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        // Ensure .tmp directory exists at project root level (../..)
        // We are in frontend/app/api/strip, so root is ../../../
        // Actually, simpler to look relative to process.cwd()
        // process.cwd() in Next.js usually points to the root of the next app (frontend)
        // But our tools are in ../tools relative to frontend.

        // Let's resolve project root. Assuming running `npm run dev` in `frontend`.
        // Tools are at ../tools
        const projectRoot = path.resolve(process.cwd(), '..');
        const tmpDir = path.join(projectRoot, '.tmp');
        if (!fs.existsSync(tmpDir)) {
            fs.mkdirSync(tmpDir, { recursive: true });
        }

        const uniqueId = Date.now() + Math.random().toString(36).substring(7);
        const inputPath = path.join(tmpDir, `upload_${uniqueId}_${file.name}`);
        const outputPath = path.join(tmpDir, `stripped_${uniqueId}_${file.name}`);

        await writeFile(inputPath, buffer);

        // Call Python Script
        const pythonScript = path.join(projectRoot, 'tools', 'strip_c2pa.py');

        // Command: python <script> <input> <output>
        const command = `python "${pythonScript}" "${inputPath}" "${outputPath}"`;

        // console.log("Executing:", command);
        const { stdout, stderr } = await execAsync(command);

        if (stderr && stderr.trim().length > 0) {
            console.warn("Python Stderr:", stderr);
        }

        // Parse JSON result from stdout
        let result;
        try {
            result = JSON.parse(stdout.trim());
        } catch (e) {
            throw new Error(`Invalid JSON code from script: ${stdout}`);
        }

        if (result.status !== 'success') {
            throw new Error(result.message || 'Script failed');
        }

        // Read processed file
        const outputBuffer = await readFile(result.path);

        // Cleanup
        try {
            await unlink(inputPath);
            await unlink(result.path); // We send buffer back, so we can delete file
        } catch (e) {
            console.error("Cleanup failed", e);
        }

        return new NextResponse(outputBuffer, {
            headers: {
                'Content-Type': file.type,
                'Content-Disposition': `attachment; filename="stripped_${file.name}"`,
            },
        });

    } catch (error: any) {
        console.error('Error processing file:', error);
        return NextResponse.json(
            { error: 'Processing failed', details: error.message },
            { status: 500 }
        );
    }
}
