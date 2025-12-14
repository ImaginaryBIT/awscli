#!/usr/bin/env python3
"""
AWS Command Cleanup Script
Fixes command format issues (underscore -> hyphen) and removes duplicates
"""

import json
import re

def load_verification_report():
    """Load verification report"""
    with open('reports/command-verification.json', 'r') as f:
        return json.load(f)

def load_current_data():
    """Load current aws-commands.ts data"""
    with open('lib/aws-commands.ts', 'r') as f:
        content = f.read()
    
    match = re.search(r'export const awsServices: Service\[\] = (\[[\s\S]*?\n\]);', content)
    if not match:
        return []
    
    return eval(match.group(1))

def fix_command_format(command_name: str) -> str:
    """Convert underscore format to hyphen format"""
    return command_name.replace('_', '-')

def clean_commands():
    """Clean up commands based on verification report"""
    print("🧹 AWS Command Cleanup\n")
    
    # Load data
    report = load_verification_report()
    data = load_current_data()
    
    print(f"📂 Loaded {len(data)} services")
    print(f"📋 Issues found:")
    print(f"   Duplicates: {sum(len(v) for v in report['duplicates'].values())}")
    print(f"   Invalid: {sum(len(v) for v in report['invalid'].values())}\n")
    
    cleaned_count = 0
    removed_count = 0
    
    for service_data in data:
        service_name = service_data['name']
        
        # Fix underscore -> hyphen
        original_commands = service_data['commands'][:]
        fixed_commands = []
        seen = set()
        
        for cmd in original_commands:
            # Fix format
            fixed_name = fix_command_format(cmd['name'])
            
            # Skip duplicates
            if fixed_name in seen:
                print(f"   Removing duplicate: {service_name}/{fixed_name}")
                removed_count += 1
                continue
            
            seen.add(fixed_name)
            
            # Update command name
            if fixed_name != cmd['name']:
                print(f"   Fixed: {service_name}/{cmd['name']} -> {fixed_name}")
                cmd['name'] = fixed_name
                cleaned_count += 1
            
            fixed_commands.append(cmd)
        
        service_data['commands'] = fixed_commands
    
    print(f"\n✓ Fixed {cleaned_count} command names")
    print(f"✓ Removed {removed_count} duplicates")
    
    # Save cleaned data
    output = generate_typescript(data)
    
    with open('lib/aws-commands-cleaned.ts', 'w') as f:
        f.write(output)
    
    print(f"\n💾 Cleaned data saved to: lib/aws-commands-cleaned.ts")
    print(f"\n📊 Final Statistics:")
    print(f"   Services: {len(data)}")
    print(f"   Commands: {sum(len(s['commands']) for s in data)}")

def generate_typescript(data):
    """Generate TypeScript file content"""
    return f"""// AWS CLI command structure
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

// Search function
export interface SearchResult {{
  type: 'service' | 'command';
  service: string;
  command?: string;
  displayText: string;
  fullCommand: string;
  parameters?: CommandParameter[];
}}

export function searchAWSCommands(query: string): SearchResult[] {{
  const results: SearchResult[] = [];
  const lowerQuery = query.toLowerCase().trim();

  if (!lowerQuery) {{
    return results;
  }}

  const parts = lowerQuery.split(/\\s+/);
  const cleanParts = parts.filter(p => p !== 'aws');
  const servicePart = cleanParts[0] || '';
  const commandPart = cleanParts.slice(1).join('-') || '';

  // If we only have one part (searching for services or service commands)
  if (cleanParts.length === 1) {{
    const matchingServices = awsServices.filter(s =>
      s.name.toLowerCase().includes(servicePart)
    );

    matchingServices.forEach(service => {{
      service.commands.forEach(command => {{
        results.push({{
          type: 'command' as const,
          service: service.name,
          command: command.name,
          displayText: `aws ${{service.name}} ${{command.name}}`,
          fullCommand: `aws ${{service.name}} ${{command.name}}`,
          parameters: command.parameters
        }});
      }});
    }});

    return results;
  }}

  // If we have service and command parts (searching for commands)
  if (cleanParts.length >= 2) {{
    const service = awsServices.find(s => s.name.toLowerCase() === servicePart);

    if (service) {{
      const matchingCommands = service.commands.filter(cmd =>
        commandPart === '' || cmd.name.toLowerCase().includes(commandPart)
      );

      matchingCommands.forEach(command => {{
        results.push({{
          type: 'command' as const,
          service: service.name,
          command: command.name,
          displayText: `aws ${{service.name}} ${{command.name}}`,
          fullCommand: `aws ${{service.name}} ${{command.name}}`,
          parameters: command.parameters
        }});
      }});
    }}
  }}

  return results;
}}
"""

if __name__ == '__main__':
    clean_commands()
