#!/usr/bin/env python3
"""Extract parameters for EC2 commands only"""

import subprocess
import re
import os
import json
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
        if line.strip() == 'OPTIONS':
            in_options = True
            continue
        
        if in_options and line.strip() and line.strip().isupper() and len(line.strip()) > 3:
            if current_param:
                parameters.append(current_param)
            if not line.startswith(' ' * 5):
                break
        
        if in_options:
            # Pattern 1: --param | --no-param
            bool_match = re.match(r'^\s{6,}(--[a-z0-9-]+)\s+\|\s+(--no-[a-z0-9-]+)', line)
            if bool_match:
                if current_param:
                    parameters.append(current_param)
                full_name = f"{bool_match.group(1)} | {bool_match.group(2)}"
                current_param = {'name': full_name, 'description': ''}
            else:
                # Pattern 2: --param1 | --param2 (type)
                alt_bool_match = re.match(r'^\s{6,}(--[a-z0-9-]+)\s+\|\s+(--[a-z0-9-]+)\s+\(([^)]+)\)', line)
                if alt_bool_match:
                    if current_param:
                        parameters.append(current_param)
                    full_name = f"{alt_bool_match.group(1)} | {alt_bool_match.group(2)}"
                    current_param = {'name': full_name, 'description': ''}
                else:
                    # Pattern 3: --param (type)
                    param_match = re.match(r'^\s{6,}(--[a-z0-9-]+)\s+\(([^)]+)\)', line)
                    if param_match:
                        if current_param:
                            parameters.append(current_param)
                        param_name = param_match.group(1)
                        param_type = param_match.group(2)
                        if param_type in ['string', 'integer', 'long', 'float', 'double', 'timestamp']:
                            full_name = f"{param_name} <value>"
                        elif param_type == 'boolean':
                            full_name = f"{param_name} | --no-{param_name.lstrip('--')}"
                        else:
                            full_name = f"{param_name} <value>"
                        current_param = {'name': full_name, 'description': ''}
            if current_param and line.strip() and not line.startswith(' ' * 12):
                if line.strip() and not line.strip().startswith('o '):
                    if current_param['description']:
                        current_param['description'] += ' ' + line.strip()
                    else:
                        current_param['description'] = line.strip()
    
    if current_param:
        parameters.append(current_param)
    
    for param in parameters:
        desc = param['description']
        desc = re.sub(r'\s+', ' ', desc).strip()
        if len(desc) > 250:
            desc = desc[:247] + '...'
        param['description'] = desc
    
    return parameters

print("🔧 EC2 Parameter Extraction\n")

# Load current data
with open('lib/aws-commands.ts', 'r') as f:
    content = f.read()

match = re.search(r'export const awsServices: Service\[\] = (\[[\s\S]*?\n\]);', content)
data = eval(match.group(1))

# Find EC2
ec2 = [s for s in data if s['name'] == 'ec2'][0]
print(f"📂 EC2 has {len(ec2['commands'])} commands\n")

# Count commands without parameters
no_params = [cmd for cmd in ec2['commands'] if not cmd.get('parameters') or len(cmd['parameters']) == 0]
print(f"Commands without parameters: {len(no_params)}")
print(f"This will take approximately {len(no_params) * 1.5 / 60:.0f} minutes\n")

processed = 0
total_params = 0

for idx, command in enumerate(ec2['commands'], 1):
    cmd_name = command['name']
    
    # Skip if already has parameters
    if command.get('parameters') and len(command['parameters']) > 0:
        continue
    
    # Extract parameters
    help_text = run_aws_help('ec2', cmd_name)
    
    if not help_text:
        print(f"[{idx}/{len(ec2['commands'])}] {cmd_name} - ⚠️  no help")
        continue
    
    params = parse_parameters(help_text)
    command['parameters'] = params
    
    total_params += len(params)
    processed += 1
    
    if processed % 10 == 0:
        print(f"[{idx}/{len(ec2['commands'])}] {cmd_name} - ✓ {len(params)} params ({processed} done)")
    else:
        print(f"[{idx}/{len(ec2['commands'])}] {cmd_name} - ✓ {len(params)} params")

print(f"\n✅ Extraction Complete!")
print(f"📊 Statistics:")
print(f"   Commands processed: {processed}")
print(f"   Parameters extracted: {total_params}")

# Save
output_file = '.dev-data/ec2-parameters-extracted.json'
with open(output_file, 'w') as f:
    json.dump(ec2, f, indent=2)

print(f"\n💾 Saved to: {output_file}")
