#!/usr/bin/env python3
"""Remove duplicate commands from all services"""

import json
import re

print("🔧 Removing Duplicate Commands\n")

# Load current data
with open('lib/aws-commands.ts', 'r') as f:
    content = f.read()

match = re.search(r'export const awsServices: Service\[\] = (\[[\s\S]*?\n\]);', content)
data = eval(match.group(1))

print(f"📂 Loaded {len(data)} services\n")

total_removed = 0
services_fixed = []

for service in data:
    service_name = service['name']
    original_count = len(service['commands'])
    
    # Remove duplicates while preserving order
    seen = set()
    unique_commands = []
    duplicates_found = []
    
    for cmd in service['commands']:
        cmd_name = cmd['name']
        if cmd_name not in seen:
            seen.add(cmd_name)
            unique_commands.append(cmd)
        else:
            duplicates_found.append(cmd_name)
    
    if duplicates_found:
        removed = original_count - len(unique_commands)
        total_removed += removed
        services_fixed.append(service_name)
        
        print(f"❌ {service_name}:")
        print(f"   Original: {original_count} commands")
        print(f"   Duplicates: {', '.join(duplicates_found)}")
        print(f"   Removed: {removed} duplicate(s)")
        print(f"   Final: {len(unique_commands)} commands\n")
        
        service['commands'] = unique_commands

if total_removed == 0:
    print("✅ No duplicates found!")
else:
    print(f"📊 Summary:")
    print(f"   Services fixed: {len(services_fixed)}")
    print(f"   Total duplicates removed: {total_removed}")
    print(f"   Affected services: {', '.join(services_fixed)}\n")
    
    # Backup
    import shutil
    shutil.copy('lib/aws-commands.ts', '.dev-data/aws-commands.backup-before-dedup.ts')
    print("💾 Backup saved\n")
    
    # Save cleaned data
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
    
    print("💾 Saved cleaned data to lib/aws-commands.ts")
    
    # Final stats
    total_commands = sum(len(s['commands']) for s in data)
    total_parameters = sum(s['commands'] and sum(len(c.get('parameters', [])) for c in s['commands']) for s in data)
    
    print(f"\n📊 Final Statistics:")
    print(f"   Services: {len(data)}")
    print(f"   Commands: {total_commands}")
    print(f"   Parameters: {total_parameters}")
