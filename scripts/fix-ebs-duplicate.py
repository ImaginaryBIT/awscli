#!/usr/bin/env python3
"""Fix EBS duplicate by reloading and saving properly"""

import json

print("🔧 Fixing EBS Duplicate\n")

# Load as proper JSON (not eval)
with open('lib/aws-commands.ts', 'r') as f:
    content = f.read()

# Extract JSON part
import re
match = re.search(r'export const awsServices: Service\[\] = (\[[\s\S]*?\n\]);', content)
json_str = match.group(1)

# Parse as JSON
data = json.loads(json_str)

print(f"📂 Loaded {len(data)} services\n")

# Find EBS
ebs_idx = next(i for i, s in enumerate(data) if s['name'] == 'ebs')
ebs = data[ebs_idx]

print(f"EBS before: {len(ebs['commands'])} commands")

# Remove duplicates
seen = set()
unique_commands = []
duplicates = []

for cmd in ebs['commands']:
    if cmd['name'] not in seen:
        seen.add(cmd['name'])
        unique_commands.append(cmd)
    else:
        duplicates.append(cmd['name'])

if duplicates:
    print(f"❌ Found duplicates: {', '.join(duplicates)}")
    print(f"   Removing {len(duplicates)} duplicate(s)")
    ebs['commands'] = unique_commands
    print(f"EBS after: {len(ebs['commands'])} commands\n")
    
    # Backup
    import shutil
    shutil.copy('lib/aws-commands.ts', '.dev-data/aws-commands.backup-before-ebs-dedup.ts')
    print("💾 Backup saved\n")
    
    # Save
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
    
    # Stats
    total_commands = sum(len(s['commands']) for s in data)
    total_parameters = sum(sum(len(c.get('parameters', [])) for c in s['commands']) for s in data)
    
    print(f"\n📊 Final Statistics:")
    print(f"   Services: {len(data)}")
    print(f"   Commands: {total_commands}")
    print(f"   Parameters: {total_parameters}")
else:
    print("✅ No duplicates found in EBS")
