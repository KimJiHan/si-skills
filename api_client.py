#!/usr/bin/env python3
import os
import sys
import urllib.request
import urllib.parse
from urllib.error import URLError, HTTPError
import xml.etree.ElementTree as ET
import json
import argparse

API_URL = "https://www.si.re.kr/api"

def load_env(filepath='.env'):
    """Simple dependency-free .env loader"""
    if not os.path.exists(filepath):
        return
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, val = line.split('=', 1)
                    key = key.strip()
                    val = val.strip().strip('"').strip("'")
                    if key not in os.environ:
                        os.environ[key] = val
    except Exception as e:
        print(json.dumps({"error": f"Failed to load .env: {str(e)}"}, ensure_ascii=False))
        sys.exit(1)

def extract_cdata_text(element_text):
    """Clean up potential HTML or CDATA residues from text"""
    if not element_text:
        return ""
    # CDATA is usually handled automatically by ElementTree
    # But we can strip leading/trailing whitespace
    return element_text.strip()

def search_seoul_institute(api_key, data_type="world_trends"):
    data = {
        'key': api_key,
        'command': 'extract',
        'type': data_type
    }
    encoded_data = urllib.parse.urlencode(data).encode('utf-8')
    req = urllib.request.Request(API_URL, data=encoded_data, method='POST')
    req.add_header('Content-Type', 'application/x-www-form-urlencoded')
    
    try:
        with urllib.request.urlopen(req) as response:
            xml_data = response.read()
    except HTTPError as e:
        return {"error": f"HTTP Error {e.code}: {e.reason}"}
    except URLError as e:
        return {"error": f"Connection Error: {e.reason}"}
    except Exception as e:
        return {"error": str(e)}

    # Parse XML
    try:
        root = ET.fromstring(xml_data)
        
        # Check for API level errors wrapped in XML (if any)
        # Assuming the root is <TheSeoulInstituteList> based on spec
        if root.tag != 'TheSeoulInstituteList':
            error_msg = root.text.strip() if root.text else "Unknown API Error"
            return {"error": f"API returned unexpected format: {error_msg}"}

        total_nodes = root.findtext('total_nodes', '0')
        
        results = []
        for row in root.findall('row'):
            # Elements observed: title, description, date, type, identifier
            title = extract_cdata_text(row.findtext('title', ''))
            desc = extract_cdata_text(row.findtext('description', ''))
            date_val = extract_cdata_text(row.findtext('date', ''))
            url = extract_cdata_text(row.findtext('identifier', ''))
            item_type = extract_cdata_text(row.findtext('type', ''))
            author = extract_cdata_text(row.findtext('creator', ''))
            
            # Simple HTML stripping for description if needed
            # Since LLMs can read simple HTML, we leave it as is, or we could use regex to clean it
            import re
            import html
            desc_raw_html = html.unescape(desc)
            
            # Extract image URLs
            images = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', desc_raw_html, flags=re.IGNORECASE)
            full_images = []
            for img in images:
                if img.startswith('/'):
                    full_images.append("https://www.si.re.kr" + img)
                elif not img.startswith('http'):
                    full_images.append("https://www.si.re.kr/" + img)
                else:
                    full_images.append(img)
            
            desc_clean = re.sub(r'<[^>]+>', '', desc_raw_html).strip()
            
            results.append({
                'title': title,
                'author': author,
                'description': desc_clean,
                'images': full_images,
                'date': date_val,
                'url': url,
                'type': item_type
            })
            
        return {
            'success': True,
            'total': int(total_nodes),
            'count': len(results),
            'results': results
        }

    except ET.ParseError as e:
        return {"error": f"Failed to parse XML response: {str(e)}"}
    except Exception as e:
        return {"error": str(e)}

def main():
    parser = argparse.ArgumentParser(description="Seoul Institute OpenAPI CLI Toolkit for AI Agents")
    parser.add_argument(
        "--type", 
        type=str, 
        default="world_trends", 
        help="Data type to fetch (e.g., world_trends, report, policy). Default: world_trends"
    )
    args = parser.parse_args()

    # Determine script location to reliably find .env
    script_dir = os.path.dirname(os.path.abspath(__file__))
    env_path = os.path.join(script_dir, '.env')
    load_env(env_path)

    api_key = os.environ.get("SI_API_KEY")
    if not api_key:
        print(json.dumps({"error": "SI_API_KEY environment variable is not set. Please create a .env file."}, ensure_ascii=False))
        sys.exit(1)

    result = search_seoul_institute(api_key, args.type)
    
    # Print the result as valid JSON for agents to parse easily
    print(json.dumps(result, ensure_ascii=False, indent=2))

if __name__ == "__main__":
    main()
