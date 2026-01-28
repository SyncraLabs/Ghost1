
import sys
import os
import argparse
import time
import json
import subprocess
import requests
import google.generativeai as genai
import base64
from dotenv import load_dotenv

def generate_image(prompt, output_path):
    load_dotenv()
    gemini_key = os.getenv("GEMINI_API_KEY")
    
    if not gemini_key:
        print(json.dumps({ "status": "error", "message": "Missing GEMINI_API_KEY" }))
        sys.exit(1)

    raw_path = f".tmp/raw_{int(time.time())}.png"
    os.makedirs(".tmp", exist_ok=True)
    generated = False

    try:
        # Strategy 1: SDK
        try:
            # Try explicit import if not in top level
            # sometimes it's lazy loaded
            from google.generativeai import ImageGenerationModel
            imagen_model = ImageGenerationModel("imagen-3.0-generate-001")
            response = imagen_model.generate_images(
                prompt=prompt,
                number_of_images=1,
                aspect_ratio="1:1"
            )
            response.images[0].save(raw_path)
            generated = True
        except (ImportError, AttributeError, Exception) as sdk_error:
            # Strategy 2: REST API
            # Only print debug info to stderr so we don't pollute JSON stdout
            # sys.stderr.write(f"SDK failed ({sdk_error}), trying REST...\n")
            
            url = "https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict"
            headers = {
                "Content-Type": "application/json",
                "x-goog-api-key": gemini_key
            }
            data = {
                "instances": [
                    { "prompt": prompt }
                ],
                "parameters": {
                    "sampleCount": 1,
                     "aspectRatio": "1:1"
                }
            }
            
            resp = requests.post(url, headers=headers, json=data)
            if resp.status_code != 200:
                raise Exception(f"REST API failed: {resp.status_code} {resp.text}")
            
            resp_json = resp.json()
            # Parse response
            # Format usually: { "predictions": [ { "bytesBase64Encoded": "..." } ] }
            if "predictions" not in resp_json or not resp_json["predictions"]:
                raise Exception(f"Invalid REST response: {resp.text}")
                
            b64_data = resp_json["predictions"][0].get("bytesBase64Encoded")
            if not b64_data:
                 # Check for 'mimeType' and 'bytesBase64Encoded' structure
                 raise Exception("No image data in response")
                 
            with open(raw_path, "wb") as f:
                f.write(base64.b64decode(b64_data))
            generated = True

        if not generated:
            raise Exception("All generation strategies failed.")

        # Strip Logic (Subprocess)
        strip_script = os.path.join("tools", "strip_c2pa.py")
        result = subprocess.run(
            [sys.executable, strip_script, raw_path, output_path],
            capture_output=True,
            text=True
        )
        
        if result.returncode != 0:
            raise Exception(f"Stripping failed: {result.stderr}")
            
        # Cleanup
        if os.path.exists(raw_path):
            os.remove(raw_path)
            
        print(json.dumps({ 
            "status": "success", 
            "path": output_path, 
            "prompt": prompt 
        }))

    except Exception as e:
        print(json.dumps({ "status": "error", "message": str(e) }))
        sys.exit(1)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Generate AI Image with Gemini.')
    parser.add_argument('prompt', help='Prompt text')
    parser.add_argument('output', help='Output image path')
    args = parser.parse_args()
    
    generate_image(args.prompt, args.output)
