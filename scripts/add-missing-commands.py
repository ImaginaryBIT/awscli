#!/usr/bin/env python3
"""
Add missing commands to services
"""

import json
import re
from botocore.session import Session
from botocore import xform_name

def load_current_data():
    """Load current aws-commands.ts"""
    with open('lib/aws-commands.ts', 'r') as f:
        content = f.read()
    
    match = re.search(r'export const awsServices: Service\[\] = (\[[\s\S]*?\n\]);', content)
    if not match:
        return []
    
    return eval(match.group(1))

def get_all_commands(service_name):
    """Get all commands for a service from AWS"""
    try:
        session = Session()
        client = session.create_client(service_name, region_name='us-east-1')
        service_model = client._service_model
        operations = list(service_model.operation_names)
        commands = {xform_name(op).replace('_', '-') for op in operations}
        return sorted(commands)
    except Exception as e:
        print(f"Error getting commands for {service_name}: {e}")
        return []

def add_missing_commands():
    """Add missing commands to services"""
    print("🔧 Adding Missing Commands\n")
    
    # Load current data
    data = load_current_data()
    print(f"📂 Loaded {len(data)} services\n")
    
    # Load verification report
    with open('reports/command-verification.json', 'r') as f:
        report = json.load(f)
    
    total_added = 0
    
    for service_data in data:
        service_name = service_data['name']
        missing = report['missing'].get(service_name, [])
        
        if not missing:
            continue
        
        print(f"[{service_name}] Adding {len(missing)} missing commands...")
        
        # Get existing command names
        existing = {cmd['name'] for cmd in service_data['commands']}
        
        # Add missing commands
        for cmd_name in missing:
            if cmd_name not in existing:
                service_data['commands'].append({
                    'name': cmd_name,
                    'description': f'{cmd_name} command',
                    'parameters': []
                })
                total_added += 1
        
        # Sort commands alphabetically
        service_data['commands'].sort(key=lambda x: x['name'])
    
    print(f"\n✅ Added {total_added} commands\n")
    
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
    
    # Save
    with open('lib/aws-commands.ts', 'w') as f:
        f.write(ts_content)
    
    print(f"💾 Saved to: lib/aws-commands.ts")
    
    # Final stats
    total_commands = sum(len(s['commands']) for s in data)
    print(f"\n📊 Final Statistics:")
    print(f"   Services: {len(data)}")
    print(f"   Commands: {total_commands}")

if __name__ == '__main__':
    add_missing_commands()
