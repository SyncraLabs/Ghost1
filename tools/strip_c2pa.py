
import sys
import os
import argparse
from PIL import Image

import json

def strip_c2pa(input_path, output_path):
    """
    Strips C2PA and Exif metadata by re-encoding the image.
    """
    try:
        if not os.path.exists(input_path):
            raise FileNotFoundError(f"Input file not found: {input_path}")

        # Open image
        with Image.open(input_path) as img:
            # We must convert to RGB to ensure we drop potential complex metadata layers
            # that might persist in RGBA or other modes if not handled carefully,
            # though usually saving as a fresh PNG/JPG is enough.
            # Keeping RGBA for PNGs to preserve transparency if present.
            if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
                data = list(img.getdata())
                clean_img = Image.new(img.mode, img.size)
                clean_img.putdata(data)
            else:
                clean_img = Image.new(img.mode, img.size)
                clean_img.paste(img)
            
            # Save to output path
            # optimize=True helps reduce file size but might keep some metadata in some versions.
            # We explicitly don't pass 'exif' parameter.
            clean_img.save(output_path, quality=95)
            
        print(json.dumps({ "status": "success", "path": output_path }))
        
    except Exception as e:
        print(json.dumps({ "status": "error", "message": str(e) }))
        sys.exit(1)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Strip C2PA metadata.')
    parser.add_argument('input', help='Input image path')
    parser.add_argument('output', help='Output image path')
    args = parser.parse_args()
    
    strip_c2pa(args.input, args.output)
