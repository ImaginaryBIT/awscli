#!/usr/bin/env python3
"""
AWS Parameter Extraction Script
Extracts parameters from AWS CLI help for all commands
"""

import json
import subprocess
import re
import os
from typing import List, Dict

def run_aws_help(service: str, command: str) -> str:
    """Get AWS CLI help output for a command"""
    try:
        env = {'AWS_PAGER': ''}
        result = subprocess.run(
            ['aws', service, command, 'help'],
            capture_output=True,
            text=True,
            timeout=15,
            env={**os.environ, **env}
        )
        # Remove terminal formatting characters (backspace codes for bold text)
        # Pattern: X\x08X becomes X (removes backspace and duplicate char)
        help_text = result.stdout
        help_text = re.sub(r'(.)\x08\1', r'\1', help_text)
        return help_text
    except Exception as e:
        return ""

def parse_parameters(help_text: str) -> List[Dict[str, str]]:
    """Parse parameters from AWS CLI help output"""
    parameters = []
    lines = help_text.split('\n')
    
    in_options = False
    current_param = None
    
    for i, line in enumerate(lines):
        # Detect OPTIONS section - look for line that contains only "OPTIONS" (with possible whitespace)
        if line.strip() == 'OPTIONS':
            in_options = True
            continue
        
        # Stop at next major section (all caps line)
        if in_options and line.strip() and line.strip().isupper() and len(line.strip()) > 3:
            # Don't stop at single-word constraints like "Constraints:"
            if current_param:
                parameters.append(current_param)
            # Only stop if it's a major section (not indented)
            if not line.startswith(' ' * 5):
                break
        
        if in_options:
            # Pattern 1: Boolean flag format: --param | --no-param
            bool_match = re.match(r'^\s{6,}(--[a-z0-9-]+)\s+\|\s+(--no-[a-z0-9-]+)', line)
            if bool_match:
                # Save previous parameter
                if current_param:
                    parameters.append(current_param)
                
                param_name = bool_match.group(1)
                full_name = f"{param_name} | {bool_match.group(2)}"
                
                current_param = {
                    'name': full_name,
                    'description': ''
                }
            # Pattern 2: Alternative boolean format: --param1 | --param2 (type)
            else: # This 'else' covers cases where bool_match is None
                alt_bool_match = re.match(r'^\s{6,}(--[a-z0-9-]+)\s+\|\s+(--[a-z0-9-]+)\s+\(([^)]+)\)', line)
                if alt_bool_match:
                    if current_param:
                        parameters.append(current_param)
                    param1 = alt_bool_match.group(1)
                    param2 = alt_bool_match.group(2)
                    full_name = f"{param1} | {param2}"
                    current_param = {'name': full_name, 'description': ''}
                # Pattern 3: Standard format: --parameter-name (type)
                else: # This 'else' covers cases where alt_bool_match is also None
                    param_match = re.match(r'^\s{6,}(--[a-z0-9-]+)\s+\(([^)]+)\)', line)
                    if param_match:
                        # Save previous parameter
                        if current_param:
                            parameters.append(current_param)
                        
                        param_name = param_match.group(1)
                        param_type = param_match.group(2)
                        
                        # Check if required
                        is_required = '[required]' in line.lower()
                        
                        # Build parameter name with type
                        if param_type in ['string', 'integer', 'long', 'float', 'double', 'timestamp']:
                            full_name = f"{param_name} <value>"
                        elif param_type == 'boolean':
                            full_name = f"{param_name} | --no-{param_name.lstrip('--')}"
                        else:
                            full_name = f"{param_name} <value>"
                        
                        current_param = {
                            'name': full_name,
                            'description': ''
                        }
            # Continue description for current parameter
            if current_param and line.strip() and not line.startswith(' ' * 12):
                # Continue description (lines with moderate indentation)
                # Skip lines that are too indented (likely examples or constraints)
                if line.strip() and not line.strip().startswith('o '):
                    if current_param['description']:
                        current_param['description'] += ' ' + line.strip()
                    else:
                        current_param['description'] = line.strip()
    
    if current_param:
        parameters.append(current_param)
    
    # Clean up descriptions
    for param in parameters:
        desc = param['description']
        # Remove extra whitespace
        desc = re.sub(r'\s+', ' ', desc).strip()
        # Truncate if too long
        if len(desc) > 250:
            desc = desc[:247] + '...'
        param['description'] = desc
    
    return parameters

def load_cleaned_data():
    """Load cleaned command data"""
    with open('lib/aws-commands.ts', 'r') as f:
        content = f.read()
    
    match = re.search(r'export const awsServices: Service\[\] = (\[[\s\S]*?\n\]);', content)
    if not match:
        return []
    
    return eval(match.group(1))

def extract_parameters(test_mode=False, force_mode=False):
    """Extract parameters for all commands"""
    print("🔧 AWS Parameter Extraction\n")
    
    # Load cleaned data
    data = load_cleaned_data()
    print(f"📂 Loaded {len(data)} services")
    
    total_commands = sum(len(s['commands']) for s in data)
    print(f"📊 Total commands: {total_commands}\n")
    
    if test_mode:
        print("🧪 TEST MODE: Processing first 5 services only\n")
        data = data[:5]
    
    if force_mode:
        print("⚡ FORCE MODE: Re-extracting ALL commands (including those with existing params)\n")
    
    processed = 0
    skipped = 0
    total_params = 0
    
    for service_idx, service_data in enumerate(data, 1):
        service_name = service_data['name']
        commands = service_data['commands']
        
        print(f"[{service_idx}/{len(data)}] {service_name} ({len(commands)} commands)")
        
        for cmd_idx, command in enumerate(commands, 1):
            cmd_name = command['name']
            
            # Skip if already has parameters (unless force mode)
            if not force_mode and command.get('parameters') and len(command['parameters']) > 0:
                print(f"  [{cmd_idx}/{len(commands)}] {cmd_name} - skipped (has {len(command['parameters'])} params)")
                skipped += 1
                continue
            
            # Extract parameters
            help_text = run_aws_help(service_name, cmd_name)
            
            if not help_text:
                print(f"  [{cmd_idx}/{len(commands)}] {cmd_name} - ⚠️  no help")
                continue
            
            params = parse_parameters(help_text)
            
            old_count = len(command.get('parameters', []))
            command['parameters'] = params
            
            total_params += len(params)
            processed += 1
            
            if force_mode and old_count > 0:
                print(f"  [{cmd_idx}/{len(commands)}] {cmd_name} - ✓ {len(params)} params (was {old_count})")
            else:
                print(f"  [{cmd_idx}/{len(commands)}] {cmd_name} - ✓ {len(params)} params")
    
    print(f"\n✅ Extraction Complete!")
    print(f"📊 Statistics:")
    print(f"   Services processed: {len(data)}")
    print(f"   Commands processed: {processed}")
    print(f"   Commands skipped: {skipped}")
    print(f"   Parameters extracted: {total_params}")
    
    # Save to JSON
    output_file = '.dev-data/parameters-extracted-full.json' if force_mode else 'lib/parameters-extracted.json'
    with open(output_file, 'w') as f:
        json.dump(data, f, indent=2)
    
    print(f"\n💾 Saved to: {output_file}")

if __name__ == '__main__':
    import sys
    
    # Check for test mode and force mode
    test_mode = '--test' in sys.argv
    force_mode = '--force' in sys.argv
    
    if test_mode:
        print("Running in TEST mode (first 5 services)\n")
    elif force_mode:
        print("Running FULL extraction with FORCE mode (re-extract all commands)")
        print("This will take 15-20 minutes...\n")
    else:
        print("Running FULL extraction (all services)")
        print("This will take 10-15 minutes...\n")
        response = input("Continue? (y/n): ")
        if response.lower() != 'y':
            print("Cancelled")
            sys.exit(0)
    
    extract_parameters(test_mode=test_mode, force_mode=force_mode)
