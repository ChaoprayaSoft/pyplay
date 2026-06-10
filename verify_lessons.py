import os
import re
import json

app_files = [f for f in os.listdir('.') if f.endswith('_app.js')]
for file in app_files:
    print(f"\n--- Checking {file} ---")
    content = open(file, 'r', encoding='utf-8').read()
    
    # Try to extract the lessons array block
    match = re.search(r'const\s+lessons\s*=\s*\[(.*?)\];', content, re.DOTALL)
    if not match:
        print("  Could not find 'const lessons = [...]'")
        continue
        
    lessons_block = match.group(1)
    
    # Very naive split by '{ title:' or similar to count lessons
    titles = re.findall(r'title:\s*["\']([^"\']+)["\']', lessons_block)
    expected_outputs = re.findall(r'expectedOutput:\s*(["\'].*?["\']|\[.*?\]|`.*?`)', lessons_block, re.DOTALL)
    validates = re.findall(r'validate:\s*(\([^)]*\)\s*=>\s*.*?(?=,|\n\s*\}))', lessons_block, re.DOTALL)
    
    print(f"  Found {len(titles)} titles, {len(expected_outputs)} expectedOutputs, {len(validates)} validate functions.")
    if len(expected_outputs) > 0 and len(titles) > 0:
        # Just flag if there's an obvious issue
        pass
    else:
        print("  Missing expectedOutputs or validate!")
    
    # Check for "return false" blindly
    if "return false" in content:
        print("  Contains 'return false'. Please manually verify if it breaks validation.")
