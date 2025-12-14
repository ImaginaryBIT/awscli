#!/usr/bin/env python3
"""
AWS CLI Data Extraction using boto3
This script uses boto3 (which comes with AWS CLI) to extract service definitions
"""

import json
import sys
from typing import List, Dict, Any

try:
    import boto3
    from botocore import xform_name
    from botocore.session import Session
except ImportError:
    print("❌ Error: boto3 library not found")
    print("boto3 should be installed with AWS CLI")
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
        # Access service model through _service_model (private attribute)
        service_model = client._service_model
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
        
        # Convert kebab-case to PascalCase
        operation_pascal = ''.join(word.capitalize() for word in operation_name.split('-'))
        
        if operation_pascal not in service_model.operation_names:
            return []
        
        operation_model = service_model.operation_model(operation_pascal)
        
        if not operation_model.input_shape:
            return []
        
        input_shape = operation_model.input_shape
        parameters = []
        
        if hasattr(input_shape, 'members'):
            for param_name, param_shape in input_shape.members.items():
                cli_param_name = f"--{xform_name(param_name)}"
                
                description = getattr(param_shape, 'documentation', '') or ''
                
                # Add type hint
                type_name = param_shape.type_name
                if type_name in ['list', 'map', 'structure', 'string', 'integer', 'long', 'float', 'double']:
                    cli_param_name += " <value>"
                
                # Clean up description
                description = description.replace('\n', ' ').strip()
                if len(description) > 200:
                    description = description[:197] + '...'
                
                parameters.append({
                    'name': cli_param_name,
                    'description': description
                })
        
        return parameters
    except Exception as e:
        return []


def get_service_description(session: Session, service_name: str) -> str:
    """Get service description"""
    try:
        client = session.create_client(service_name, region_name='us-east-1')
        service_model = client._service_model
        
        if hasattr(service_model, 'documentation'):
            doc = service_model.documentation or ''
            if doc:
                # Clean up and truncate
                doc = doc.replace('\n', ' ').strip()
                if len(doc) > 150:
                    doc = doc[:147] + '...'
                return doc
        
        if hasattr(service_model, 'metadata'):
            full_name = service_model.metadata.get('serviceFullName', '')
            if full_name:
                return full_name
        
        return f"AWS {service_name.upper()} Service"
    except:
        return f"AWS {service_name.upper()} Service"


def extract_service_data(session: Session, service_name: str, max_commands: int = 20) -> Dict[str, Any]:
    """Extract all data for a service"""
    print(f"\n📦 {service_name}...")
    
    description = get_service_description(session, service_name)
    commands = get_service_commands(session, service_name)
    
    if not commands:
        print(f"   ⚠️  No commands found")
        return None
    
    print(f"   {len(commands)} commands", end='')
    
    # Limit commands
    commands = commands[:max_commands]
    
    service_data = {
        'name': service_name,
        'description': description,
        'commands': []
    }
    
    total_params = 0
    for cmd in commands:
        try:
            params = get_command_parameters(session, service_name, cmd)
            total_params += len(params)
            
            service_data['commands'].append({
                'name': cmd,
                'description': f"{cmd} operation",
                'parameters': params
            })
        except Exception as e:
            pass
    
    print(f", {total_params} params ✓")
    return service_data


def main():
    print("🚀 AWS Data Extraction (using boto3)\n")
    
    session = Session()
    
    print("📋 Getting AWS services...")
    all_services = get_all_services(session)
    print(f"✓ Found {len(all_services)} services\n")
    
    print("How many services to extract?")
    print("  1. First 10 (quick test - 1 min)")
    print("  2. First 30 (recommended - 3 min)")
    print("  3. First 50 (comprehensive - 5 min)")
    print(f"  4. All {len(all_services)} (complete - 15-20 min)")
    
    choice = input("\nChoice (1-4) [2]: ").strip() or "2"
    
    limits = {"1": 10, "2": 30, "3": 50, "4": len(all_services)}
    services = all_services[:limits.get(choice, 30)]
    
    print(f"\n📊 Extracting {len(services)} services...\n")
    
    all_data = []
    total_commands = 0
    total_params = 0
    
    for i, service in enumerate(services, 1):
        try:
            print(f"[{i}/{len(services)}]", end=' ')
            service_data = extract_service_data(session, service, max_commands=15)
            
            if service_data:
                all_data.append(service_data)
                total_commands += len(service_data['commands'])
                total_params += sum(len(cmd['parameters']) for cmd in service_data['commands'])
        except Exception as e:
            print(f"   ❌ Error: {e}")
    
    output_file = 'lib/aws-commands-extracted.json'
    with open(output_file, 'w') as f:
        json.dump(all_data, f, indent=2)
    
    print(f"\n✅ Complete!\n")
    print(f"📊 Statistics:")
    print(f"   Services:   {len(all_data)}")
    print(f"   Commands:   {total_commands}")
    print(f"   Parameters: {total_params}")
    print(f"\n💾 Saved to: {output_file}")


if __name__ == '__main__':
    main()
