#!/usr/bin/env python3
"""Add all missing EC2 commands"""

import re
import json
from botocore.session import Session
from botocore import xform_name

# Get all EC2 commands from AWS
session = Session()
client = session.create_client('ec2', region_name='us-east-1')
service_model = client._service_model
operations = list(service_model.operation_names)
aws_commands = sorted([xform_name(op).replace('_', '-') for op in operations])

print(f"🔧 Adding Missing EC2 Commands\n")
print(f"AWS EC2 has {len(aws_commands)} commands\n")

# Load current data
with open('lib/aws-commands.ts', 'r') as f:
    content = f.read()

match = re.search(r'export const awsServices: Service\[\] = (\[[\s\S]*?\n\]);', content)
data = eval(match.group(1))

# Find EC2 service
ec2_idx = next(i for i, s in enumerate(data) if s['name'] == 'ec2')
ec2 = data[ec2_idx]

existing_commands = set([cmd['name'] for cmd in ec2['commands']])
print(f"Current EC2 commands: {len(existing_commands)}")

# Add missing commands
missing = [cmd for cmd in aws_commands if cmd not in existing_commands]
print(f"Missing commands: {len(missing)}\n")

for cmd_name in missing:
    ec2['commands'].append({
        'name': cmd_name,
        'description': f'{cmd_name} command',
        'parameters': []
    })

# Sort commands
ec2['commands'].sort(key=lambda x: x['name'])

print(f"✅ Added {len(missing)} commands to EC2")
print(f"📊 EC2 now has {len(ec2['commands'])} commands\n")

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

# Backup
import shutil
shutil.copy('lib/aws-commands.ts', '.dev-data/aws-commands.backup-before-ec2-expansion.ts')
print("💾 Backup saved")

# Save
with open('lib/aws-commands.ts', 'w') as f:
    f.write(ts_content)

print("💾 Saved to lib/aws-commands.ts")

# Final stats
total_commands = sum(len(s['commands']) for s in data)
print(f"\n📊 Final Statistics:")
print(f"   Services: {len(data)}")
print(f"   Commands: {total_commands}")
