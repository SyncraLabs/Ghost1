# SOP: Generate AI Image (Clean)

## Goal
Generate an image using Google Gemini (Imagen) and immediately strip any auto-injected C2PA credentials.

## Input
- `prompt`: Text description.
- `output_path`: Destination path.

## Logic
1.  **Generate**:
    - Call `google.generativeai` with the `prompt`.
    - Receive binary/image object.
2.  **Save Intermediate**:
    - Save raw result to `.tmp/raw_gen_<timestamp>.png`.
3.  **Strip (Chain)**:
    - Call `tools/strip_c2pa.py` on the intermediate file.
    - Target: `output_path`.
4.  **Cleanup**:
    - Delete `.tmp` raw file.
5.  **Output**:
    - Return `{"status": "success", "path": output_path, "original_prompt": prompt}`.

## Tools
- `tools/generate_image.py` (Orchestrator)
- `tools/strip_c2pa.py` (Worker)
