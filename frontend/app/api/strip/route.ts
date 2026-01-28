import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // Read file into buffer
        const arrayBuffer = await file.arrayBuffer();
        const inputBuffer = Buffer.from(arrayBuffer);

        // Determine output format based on original file type
        const mimeType = file.type;
        let outputBuffer: Buffer;
        let outputMimeType: string;

        if (mimeType === 'image/png') {
            // Process PNG - strip all metadata
            outputBuffer = await sharp(inputBuffer)
                .png({ quality: 100 })
                .withMetadata({ exif: {}, icc: undefined, iptc: {} } as any)
                .toBuffer();

            // Force re-encode to ensure metadata is stripped
            outputBuffer = await sharp(outputBuffer)
                .png()
                .toBuffer();
            outputMimeType = 'image/png';
        } else if (mimeType === 'image/webp') {
            // Process WebP
            outputBuffer = await sharp(inputBuffer)
                .webp({ quality: 95 })
                .toBuffer();
            outputMimeType = 'image/webp';
        } else {
            // Default to JPEG for other formats
            outputBuffer = await sharp(inputBuffer)
                .jpeg({ quality: 95 })
                .toBuffer();
            outputMimeType = 'image/jpeg';
        }

        // Get clean filename
        const originalName = file.name;
        const cleanName = `stripped_${originalName}`;

        return new NextResponse(new Uint8Array(outputBuffer), {
            headers: {
                'Content-Type': outputMimeType,
                'Content-Disposition': `attachment; filename="${cleanName}"`,
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
