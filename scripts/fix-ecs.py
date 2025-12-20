#!/usr/bin/env python3
import subprocess, re, os, json, shutil
from botocore.session import Session
from botocore import xform_name

def run_aws_help(service, command):
    try:
        result = subprocess.run(['aws', service, command, 'help'], capture_output=True, text=True, 
                              timeout=15, env={**os.environ, 'AWS_PAGER': ''})
        return re.sub(r'(.)\x08\1', r'\1', result.stdout)
    except: return ""

def parse_parameters(help_text):
    params, lines, in_opts, cur = [], help_text.split('\n'), False, None
    for line in lines:
        if line.strip() == 'OPTIONS': in_opts = True; continue
        if in_opts and line.strip() and line.strip().isupper() and len(line.strip()) > 3:
            if cur: params.append(cur)
            if not line.startswith(' ' * 5): break
        if in_opts:
            m1 = re.match(r'^\s{6,}(--[a-z0-9-]+)\s+\|\s+(--no-[a-z0-9-]+)', line)
            if m1:
                if cur: params.append(cur)
                cur = {'name': f"{m1.group(1)} | {m1.group(2)}", 'description': ''}
            else:
                m2 = re.match(r'^\s{6,}(--[a-z0-9-]+)\s+\|\s+(--[a-z0-9-]+)\s+\(([^)]+)\)', line)
                if m2:
                    if cur: params.append(cur)
                    cur = {'name': f"{m2.group(1)} | {m2.group(2)}", 'description': ''}
                else:
                    m3 = re.match(r'^\s{6,}(--[a-z0-9-]+)\s+\(([^)]+)\)', line)
                    if m3:
                        if cur: params.append(cur)
                        pn, pt = m3.group(1), m3.group(2)
                        fn = f"{pn} <value>" if pt != 'boolean' else f"{pn} | --no-{pn.lstrip('--')}"
                        cur = {'name': fn, 'description': ''}
            if cur and line.strip() and not line.startswith(' '*12) and not line.strip().startswith('o '):
                cur['description'] = (cur['description'] + ' ' + line.strip()).strip()
    if cur: params.append(cur)
    for p in params: p['description'] = re.sub(r'\s+', ' ', p['description']).strip()[:247]
    return params

print("🔧 Fixing ECS\n")
session = Session()
client = session.create_client('ecs', region_name='us-east-1')
all_cmds = sorted([xform_name(op).replace('_', '-') for op in client._service_model.operation_names])
print(f"AWS has {len(all_cmds)} commands\n")

with open('lib/aws-commands.ts', 'r') as f: content = f.read()
data = json.loads(re.search(r'export const awsServices: Service\[\] = (\[[\s\S]*?\n\]);', content).group(1))
idx = next(i for i, s in enumerate(data) if s['name'] == 'ecs')
svc = data[idx]
existing = {c['name']: c for c in svc['commands']}

print(f"Current: {len(existing)}, Missing: {len(all_cmds) - len(existing)}\n")

new_commands = []
for i, cmd in enumerate(all_cmds, 1):
    if cmd not in existing or not existing[cmd].get('parameters'):
        print(f"[{i}/{len(all_cmds)}] {cmd}...", end=' ')
        help_txt = run_aws_help('ecs', cmd)
        params = parse_parameters(help_txt) if help_txt else []
        new_commands.append({'name': cmd, 'description': f'{cmd} command', 'parameters': params})
        print(f"✓ {len(params)} params")
    else:
        new_commands.append(existing[cmd])

svc['commands'] = sorted(new_commands, key=lambda x: x['name'])
print(f"\n✅ Updated: {len(svc['commands'])} commands")

shutil.copy('lib/aws-commands.ts', '.dev-data/aws-commands.backup-before-ecs-fix.ts')

with open('lib/aws-commands.ts', 'w') as f:
    f.write(f"""// AWS CLI command structure
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
""")

print(f"\n💾 Saved ECS updates")
