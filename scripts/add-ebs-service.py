#!/usr/bin/env python3
"""Add EBS service with all commands and parameters"""

import subprocess
import re
import os
import json
from typing import List, Dict
from botocore.session import Session
from botocore import xform_name

def run_aws_help(service: str, command: str) -> str:
    """Get AWS CLI help output"""
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
    """Parse parameters from help output"""
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

print("🔧 Adding EBS Service\n")

# Get EBS commands from boto3
session = Session()
client = session.create_client('ebs', region_name='us-east-1')
service_model = client._service_model
operations = list(service_model.operation_names)
ebs_commands = sorted([xform_name(op).replace('_', '-') for op in operations])

print(f"📂 EBS has {len(ebs_commands)} commands")
print(f"   Commands: {', '.join(ebs_commands)}\n")

# Extract parameters for each command
ebs_service = {
    'name': 'ebs',
    'description': 'Amazon Elastic Block Store direct APIs',
    'commands': []
}

for idx, cmd_name in enumerate(ebs_commands, 1):
    print(f"[{idx}/{len(ebs_commands)}] {cmd_name}...", end=' ')
    
    help_text = run_aws_help('ebs', cmd_name)
    if not help_text:
        print("⚠️  no help")
        ebs_service['commands'].append({
            'name': cmd_name,
            'description': f'{cmd_name} command',
            'parameters': []
        })
        continue
    
    params = parse_parameters(help_text)
    ebs_service['commands'].append({
        'name': cmd_name,
        'description': f'{cmd_name} command',
        'parameters': params
    })
    print(f"✓ {len(params)} params")

total_params = sum(len(cmd['parameters']) for cmd in ebs_service['commands'])
print(f"\n✅ EBS extraction complete!")
print(f"   Commands: {len(ebs_service['commands'])}")
print(f"   Parameters: {total_params}\n")

# Load current data
with open('lib/aws-commands.ts', 'r') as f:
    content = f.read()

match = re.search(r'export const awsServices: Service\[\] = (\[[\s\S]*?\n\]);', content)
data = eval(match.group(1))

# Add EBS service (insert alphabetically)
data.append(ebs_service)
data.sort(key=lambda x: x['name'])

print("✅ Added EBS to services list\n")

# Backup
import shutil
shutil.copy('lib/aws-commands.ts', '.dev-data/aws-commands.backup-before-ebs.ts')
print("💾 Backup saved\n")

# Generate TypeScript file
ts_content = f"""// AWS CLI command structure
export interface CommandParameter {{
  name: string;
  description?: string;
}}

export interface Command {{
  name: string;
  description?: string;
  parameters: CommandParameter[];
}}

export interface Service {{
  name: string;
  description?: string;
  commands: Command[];
}}

// AWS CLI data structure
export const awsServices: Service[] = {json.dumps(data, indent=2)};
"""

with open('lib/aws-commands.ts', 'w') as f:
    f.write(ts_content)

print("💾 Saved to lib/aws-commands.ts")

# Final stats
total_commands = sum(len(s['commands']) for s in data)
total_parameters = sum(s['commands'] and sum(len(c.get('parameters', [])) for c in s['commands']) for s in data)

print(f"\n📊 Final Statistics:")
print(f"   Services: {len(data)}")
print(f"   Commands: {total_commands}")
print(f"   Parameters: {total_parameters}")
