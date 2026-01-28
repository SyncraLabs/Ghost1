# SOP: Strip C2PA Metadata

## Goal
Remove all Content Credentials (C2PA) and Exif metadata from a given image to ensure privacy and "clean" content.

## Input
- `input_path`: Path to the source image (local file).
- `output_path`: Path where the stripped image should be saved.

## Logic (The "How-To")
1.  **Load Image**: Use `PIL.Image.open()`.
2.  **Strip Metadata**:
    - Create a new image buffer (fresh bytes).
    - Save the image payload *data* only into the new buffer/file.
    - Explicitly exclude `exif`, `metadata`, and proprietary chunks (e.g., C2PA manifests often live in unique chunks like `c2pa` or XMP).
    - **Re-encoding Rule**: We MUST re-encode the pixels (e.g., read pixels -> write new PNG/JPG). This destroys the original file structure where C2PA manifests hide. Simply copying bytes is forbidden.
3.  **Verification (Self-Healing)**:
    - Attempt to read metadata from the output.
    - If "c2pa" or "manifest" keywords appear in raw bytes, FAIL.
4.  **Output**:
    - Return `{"status": "success", "path": output_path}`.

## Tools
- `tools/strip_c2pa.py`
