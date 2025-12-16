#!/usr/bin/env python3
"""Add missing Lambda commands and extract parameters"""

import subprocess, re, os, json, shutil
from typing import List, Dict
from botocore.session import Session
from botocore import xform_name

def run_aws_help(service: str, command: str) -> str:
    try:
        env = {'AWS_PAGER': ''}
        result = subprocess.run(
            ['aws', service, command, 'help'],
            capture_output=True, text=True, timeout=15,
            env={**os.environ, **env}
        )
        return re.sub(r'(.)\x08\1', r'\1', result.stdout)
    except:
        return ""

def parse_parameters(help_text: str) -> List[Dict[str, str]]:
    parameters, lines, in_options, current_param = [], help_text.split('\n'), False, None
    
    for line in lines:
        if line.strip() == 'OPTIONS':
            in_options = True
            continue
        if in_options and line.strip() and line.strip().isupper() and len(line.strip()) > 3:
            if current_param:
                parameters.append(current_param)
            if not line.startswith(' ' * 5):
                break
        
        if in_options:
            bool_match = re.match(r'^\s{6,}(--[a-z0-9-]+)\s+\|\s+(--no-[a-z0-9-]+)', line)
            if bool_match:
                if current_param:
                    parameters.append(current_param)
                current_param = {'name': f"{bool_match.group(1)} | {bool_match.group(2)}", 'description': ''}
            else:
                alt_bool = re.match(r'^\s{6,}(--[a-z0-9-]+)\s+\|\s+(--[a-z0-9-]+)\s+\(([^)]+)\)', line)
                if alt_bool:
                    if current_param:
                        parameters.append(current_param)
                    current_param = {'name': f"{alt_bool.group(1)} | {alt_bool.group(2)}", 'description': ''}
                else:
                    param_match = re.match(r'^\s{6,}(--[a-z0-9-]+)\s+\(([^)]+)\)', line)
                    if param_match:
                        if current_param:
                            parameters.append(current_param)
                        pname, ptype = param_match.group(1), param_match.group(2)
                        fname = f"{pname} <value>" if ptype != 'boolean' else f"{pname} | --no-{pname.lstrip('--')}"
                        current_param = {'name': fname, 'description': ''}
            if current_param and line.strip() and not line.startswith(' ' * 12) and not line.strip().startswith('o '):
                current_param['description'] = (current_param['description'] + ' ' + line.strip()).strip()
    
    if current_param:
        parameters.append(current_param)
    
    for p in parameters:
        p['description'] = re.sub(r'\s+', ' ', p['description']).strip()[:247] + ('...' if len(p['description']) > 250 else '')
    
    return parameters

print("🔧 Fixing Lambda Service\n")

session = Session()
client = session.create_client('lambda', region_name='us-east-1')
all_commands = sorted([xform_name(op).replace('_', '-') for op in client._service_model.operation_names])

print(f"AWS Lambda has {len(all_commands)} commands\n")

with open('lib/aws-commands.ts', 'r') as f:
    content = f.read()

data = json.loads(re.search(r'export const awsServices: Service\[\] = (\[[\s\S]*?\n\]);', content).group(1))

lambda_idx = next(i for i, s in enumerate(data) if s['name'] == 'lambda')
lambda_svc = data[lambda_idx]

existing = set([cmd['name'] for cmd in lambda_svc['commands']])
missing = [cmd for cmd in all_commands if cmd not in existing]

print(f"Current: {len(existing)} commands")
print(f"Missing: {len(missing)} commands\n")

for idx, cmd_name in enumerate(all_commands, 1):
    if cmd_name not in existing:
        print(f"[{idx}/{len(all_commands)}] {cmd_name} - adding...", end=' ')
        help_text = run_aws_help('lambda', cmd_name)
        params = parse_parameters(help_text) if help_text else []
        lambda_svc['commands'].append({'name': cmd_name, 'description': f'{cmd_name} command', 'parameters': params})
        print(f"✓ {len(params)} params")

lambda_svc['commands'].sort(key=lambda x: x['name'])

print(f"\n✅ Lambda updated: {len(lambda_svc['commands'])} commands")

shutil.copy('lib/aws-commands.ts', '.dev-data/aws-commands.backup-before-lambda-fix.ts')

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

total_cmds = sum(len(s['commands']) for s in data)
total_params = sum(sum(len(c.get('parameters', [])) for c in s['commands']) for s in data)

print(f"\n💾 Saved\n\n📊 Final: {len(data)} services, {total_cmds} commands, {total_params} parameters")
