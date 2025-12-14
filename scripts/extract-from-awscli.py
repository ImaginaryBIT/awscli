#!/usr/bin/env python3
"""
AWS CLI Data Extraction using awscli library
This script uses the awscli Python library to programmatically extract
all services, commands, and parameters.
"""

import json
import sys
from typing import List, Dict, Any

try:
    from awscli.clidriver import CLIDriver
    from botocore.session import Session
    from botocore import xform_name
except ImportError:
    print("❌ Error: awscli library not found")
    print("Install with: pip install awscli")
    sys.exit(1)


def get_all_services(session: Session) -> List[str]:
    """Get list of all available AWS services"""
    services = session.get_available_services()
    # Filter out non-standard services
    filtered = [s for s in services if not s.startswith('_')]
    return sorted(filtered)


def get_service_commands(session: Session, service_name: str) -> List[str]:
    """Get all operations (commands) for a service"""
    try:
        client = session.create_client(service_name, region_name='us-east-1')
        # Get service model
        service_model = client._service_model
        # Get all operation names
        operations = list(service_model.operation_names)
        # Convert to CLI command format (PascalCase -> kebab-case)
        commands = [xform_name(op) for op in operations]
        return sorted(commands)
    except Exception as e:
        print(f"   ⚠️  Error getting commands for {service_name}: {e}")
        return []


def get_command_parameters(session: Session, service_name: str, operation_name: str) -> List[Dict[str, str]]:
    """Get all parameters for a command"""
    try:
        client = session.create_client(service_name, region_name='us-east-1')
        service_model = client._service_model
        
        # Convert kebab-case to PascalCase for operation lookup
        operation_pascal = ''.join(word.capitalize() for word in operation_name.split('-'))
        
        # Get operation model
        if operation_pascal not in service_model.operation_names:
            return []
        
        operation_model = service_model.operation_model(operation_pascal)
        
        # Get input shape
        if not operation_model.input_shape:
            return []
        
        input_shape = operation_model.input_shape
        parameters = []
        
        # Extract parameters from input shape
        if hasattr(input_shape, 'members'):
            for param_name, param_shape in input_shape.members.items():
                # Convert to CLI parameter format
                cli_param_name = f"--{xform_name(param_name)}"
                
                # Get parameter description
                description = ""
                if hasattr(param_shape, 'documentation'):
                    description = param_shape.documentation or ""
                
                # Add type information
                type_name = param_shape.type_name
                if type_name in ['list', 'map', 'structure']:
                    cli_param_name += " <value>"
                elif type_name == 'string':
                    cli_param_name += " <value>"
                elif type_name == 'integer':
                    cli_param_name += " <value>"
                elif type_name == 'boolean':
                    # Boolean parameters don't need <value>
                    pass
                
                parameters.append({
                    'name': cli_param_name,
                    'description': description.strip()
                })
        
        return parameters
    except Exception as e:
        print(f"      ⚠️  Error getting parameters: {e}")
        return []


def get_service_description(session: Session, service_name: str) -> str:
    """Get service description"""
    try:
        client = session.create_client(service_name, region_name='us-east-1')
        service_model = client._service_model
        
        # Get service documentation
        if hasattr(service_model, 'documentation'):
            return service_model.documentation or f"AWS {service_name.upper()} Service"
        
        # Get service full name from metadata
        if hasattr(service_model, 'metadata'):
            service_full_name = service_model.metadata.get('serviceFullName', '')
            if service_full_name:
                return service_full_name
        
        return f"AWS {service_name.upper()} Service"
    except:
        return f"AWS {service_name.upper()} Service"


def extract_service_data(session: Session, service_name: str, max_commands: int = 20) -> Dict[str, Any]:
    """Extract all data for a service"""
    print(f"\n📦 Extracting {service_name}...")
    
    # Get service description
    description = get_service_description(session, service_name)
    
    # Get commands
    commands = get_service_commands(session, service_name)
    print(f"   Found {len(commands)} commands")
    
    # Limit commands
    commands = commands[:max_commands]
    
    service_data = {
        'name': service_name,
        'description': description,
        'commands': []
    }
    
    for cmd in commands:
        try:
            params = get_command_parameters(session, service_name, cmd)
            
            # Get command description (operation description)
            cmd_description = f"{cmd} operation for {service_name}"
            
            service_data['commands'].append({
                'name': cmd,
                'description': cmd_description,
                'parameters': params
            })
            print(f"   ✓ {cmd} ({len(params)} params)")
        except Exception as e:
            print(f"   ✗ {cmd} - Error: {e}")
    
    return service_data


def main():
    print("🚀 AWS CLI Data Extraction (using awscli library)\n")
    
    # Create botocore session
    session = Session()
    
    # Get all services
    print("📋 Getting list of AWS services...")
    all_services = get_all_services(session)
    print(f"✓ Found {len(all_services)} services\n")
    
    # Ask user how many services to process
    print(f"How many services would you like to extract?")
    print(f"  1. First 10 services (quick test)")
    print(f"  2. First 30 services (recommended)")
    print(f"  3. First 50 services (comprehensive)")
    print(f"  4. All {len(all_services)} services (may take 15-20 minutes)")
    
    choice = input("\nEnter choice (1-4) [default: 2]: ").strip() or "2"
    
    if choice == "1":
        services = all_services[:10]
    elif choice == "2":
        services = all_services[:30]
    elif choice == "3":
        services = all_services[:50]
    else:
        services = all_services
    
    print(f"\n📊 Extracting {len(services)} services...\n")
    
    all_data = []
    total_commands = 0
    total_params = 0
    
    for service in services:
        try:
            service_data = extract_service_data(session, service, max_commands=15)
            all_data.append(service_data)
            
            total_commands += len(service_data['commands'])
            total_params += sum(len(cmd['parameters']) for cmd in service_data['commands'])
        except Exception as e:
            print(f"❌ Error processing {service}: {e}")
    
    # Save to JSON
    output_file = 'lib/aws-commands-extracted.json'
    with open(output_file, 'w') as f:
        json.dump(all_data, f, indent=2)
    
    print(f"\n✅ Extraction Complete!\n")
    print(f"📊 Statistics:")
    print(f"   Services: {len(all_data)}")
    print(f"   Commands: {total_commands}")
    print(f"   Parameters: {total_params}")
    print(f"\n💾 Saved to: {output_file}")
    print(f"\n💡 Next steps:")
    print(f"   1. Review the extracted data")
    print(f"   2. Use the merge script to combine with existing data")
    print(f"   3. Test the search functionality")


if __name__ == '__main__':
    main()
