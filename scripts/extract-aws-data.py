#!/usr/bin/env python3
"""
AWS CLI Data Extraction Script
Extracts all services, commands, and parameters from AWS CLI v2
"""

import subprocess
import json
import re
from typing import List, Dict, Any

def run_command(cmd: List[str]) -> str:
    """Run a command and return its output"""
    try:
        # Disable AWS CLI pager to get full output
        env = {'AWS_PAGER': ''}
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=30,
            env={**subprocess.os.environ, **env}
        )
        return result.stdout
    except Exception as e:
        print(f"Error running {' '.join(cmd)}: {e}")
        return ""

def get_all_services() -> List[str]:
    """Get list of all AWS services using aws help"""
    print("📋 Getting list of AWS services...")
    
    # Use aws help and parse the output
    output = run_command(['aws', 'help'])
    
    # Look for service names in the help output
    # AWS CLI v2 lists services after "AVAILABLE SERVICES" section
    services = []
    in_services_section = False
    
    for line in output.split('\n'):
        # Check if we're in the services section
        if 'AVAILABLE SERVICES' in line or 'Available Services' in line:
            in_services_section = True
            continue
        
        # Stop at next major section
        if in_services_section and re.match(r'^[A-Z][A-Z\s]+$', line.strip()):
            break
        
        # Extract service names (they start with 'o' or are indented)
        if in_services_section:
            match = re.search(r'^\s+[o•]\s+([a-z0-9-]+)', line)
            if match:
                service = match.group(1)
                if service not in ['help', 'configure']:
                    services.append(service)
    
    # If parsing failed, use a known list of common services
    if not services:
        print("⚠️  Could not parse services from help, using known list...")
        services = [
            'ec2', 's3', 's3api', 'lambda', 'dynamodb', 'rds', 'iam', 
            'cloudformation', 'cloudwatch', 'sns', 'sqs', 'ecs', 'ecr', 
            'eks', 'elasticache', 'route53', 'elb', 'elbv2', 'autoscaling',
            'cloudfront', 'apigateway', 'cognito-idp', 'secretsmanager',
            'ssm', 'kms', 'acm', 'logs', 'events', 'kinesis', 'firehose',
            'stepfunctions', 'batch', 'glue', 'athena', 'redshift',
            'elasticbeanstalk', 'codecommit', 'codebuild', 'codedeploy',
            'codepipeline', 'cloudtrail', 'config', 'guardduty', 'inspector',
            'macie2', 'securityhub', 'waf', 'wafv2', 'shield'
        ]
    
    print(f"✓ Found {len(services)} services")
    return services

def get_service_commands(service: str) -> List[str]:
    """Get all commands for a service"""
    output = run_command(['aws', service, 'help'])
    
    commands = []
    in_commands_section = False
    
    for line in output.split('\n'):
        # Look for AVAILABLE COMMANDS section
        if 'AVAILABLE COMMANDS' in line.upper():
            in_commands_section = True
            continue
        
        # Stop at next major section (all caps line)
        if in_commands_section:
            # Check if we hit another section
            stripped = line.strip()
            if stripped and stripped.isupper() and len(stripped) > 3:
                break
        
        # Extract command names - they appear as "       o command-name"
        if in_commands_section:
            # Match lines with 'o' followed by command name
            match = re.match(r'^\s+o\s+([a-z0-9-]+)\s*$', line)
            if match:
                cmd = match.group(1)
                if cmd not in ['help', 'wait']:
                    commands.append(cmd)
    
    return commands

def get_command_parameters(service: str, command: str) -> List[Dict[str, str]]:
    """Get all parameters for a command"""
    output = run_command(['aws', service, command, 'help'])
    
    parameters = []
    in_options_section = False
    current_param = None
    
    lines = output.split('\n')
    for i, line in enumerate(lines):
        # Check if we're in OPTIONS section
        if 'OPTIONS' in line and 'GLOBAL OPTIONS' not in line:
            in_options_section = True
            continue
        
        # Stop at next major section
        if in_options_section and re.match(r'^[A-Z][A-Z\s]+$', line.strip()):
            if current_param:
                parameters.append(current_param)
            break
        
        if in_options_section:
            # New parameter starts with --
            param_match = re.match(r'^\s+(--[^\s]+(?:\s+<[^>]+>)?)', line)
            if param_match:
                # Save previous parameter
                if current_param:
                    parameters.append(current_param)
                
                # Start new parameter
                param_name = param_match.group(1).strip()
                description = line[param_match.end():].strip()
                
                current_param = {
                    'name': param_name,
                    'description': description
                }
            elif current_param and line.strip() and not line.startswith(' ' * 10):
                # Continue description (but not if it's too indented - likely an example)
                current_param['description'] += ' ' + line.strip()
    
    if current_param:
        parameters.append(current_param)
    
    return parameters

def extract_service_data(service: str, max_commands: int = 20) -> Dict[str, Any]:
    """Extract all data for a service"""
    print(f"\n📦 Extracting {service}...")
    
    commands = get_service_commands(service)
    print(f"   Found {len(commands)} commands")
    
    # Limit commands to avoid overwhelming the system
    commands = commands[:max_commands]
    
    service_data = {
        'name': service,
        'description': f'Amazon {service.upper()} Service',
        'commands': []
    }
    
    for cmd in commands:
        try:
            params = get_command_parameters(service, cmd)
            service_data['commands'].append({
                'name': cmd,
                'description': f'{cmd} command for {service}',
                'parameters': params
            })
            print(f"   ✓ {cmd} ({len(params)} params)")
        except Exception as e:
            print(f"   ✗ {cmd} - Error: {e}")
    
    return service_data

def main():
    print("🚀 AWS CLI Automated Data Extraction\n")
    
    # Get all services
    services = get_all_services()
    
    # Ask user how many services to process
    print(f"\nFound {len(services)} services")
    print("How many services would you like to extract?")
    print("  1. First 10 services (quick test)")
    print("  2. First 30 services (recommended)")
    print("  3. All services (may take 10-15 minutes)")
    
    choice = input("\nEnter choice (1-3) [default: 2]: ").strip() or "2"
    
    if choice == "1":
        services = services[:10]
    elif choice == "2":
        services = services[:30]
    # else: use all services
    
    print(f"\n📊 Extracting {len(services)} services...\n")
    
    all_data = []
    total_commands = 0
    total_params = 0
    
    for service in services:
        try:
            service_data = extract_service_data(service, max_commands=15)
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
    print(f"   2. Merge with existing data in lib/aws-commands.ts")
    print(f"   3. Update imports if needed")

if __name__ == '__main__':
    main()
