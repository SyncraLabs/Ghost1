
import os
import requests
from dotenv import load_dotenv
import google.generativeai as genai

def handshake():
    load_dotenv()
    
    # 1. Check Supabase (REST)
    supabase_url = os.getenv("SUPABASE_URL")
    supabase_key = os.getenv("SUPABASE_KEY")
    
    print("Checking Supabase Connection...")
    if not supabase_url or not supabase_key:
        print("[FAIL] Missing Supabase Credentials in .env")
    else:
        try:
            headers = {"apikey": supabase_key, "Authorization": f"Bearer {supabase_key}"}
            # Health check or simple query
            # Supabase usually exposes /rest/v1/
            response = requests.get(f"{supabase_url}/rest/v1/", headers=headers, timeout=5)
            if response.status_code in [200, 404]: # 200 or 404 means server reached
                print("[PASS] Supabase reachable (REST)")
            else:
                 print(f"[WARN] Supabase returned status {response.status_code}")
        except Exception as e:
            print(f"[FAIL] Supabase Error: {e}")

    # 2. Check Gemini
    gemini_key = os.getenv("GEMINI_API_KEY")
    print("\nChecking Gemini Connection...")
    if not gemini_key:
        print("[FAIL] Missing Gemini Credentials in .env")
    else:
        try:
            genai.configure(api_key=gemini_key)
            print("[PASS] Gemini Configured (Client logic pending key)")
        except Exception as e:
            print(f"[FAIL] Gemini Error: {e}")

if __name__ == "__main__":
    handshake()
