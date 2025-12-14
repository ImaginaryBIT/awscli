#!/usr/bin/env python3
"""
AWS Command Verification Script
Verifies command accuracy and identifies duplicates by comparing with actual AWS CLI
"""

import json
import subprocess
import re
from typing import List, Dict, Set
from collections import defaultdict

def run_aws_command(cmd: List[str]) -> str:
    """Run AWS CLI command and return output"""
    try:
        env = {'AWS_PAGER': ''}
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=10,
            env={**subprocess.os.environ, **env}
        )
        return result.stdout
    except Exception as e:
        return ""

def get_actual_commands(service: str) -> Set[str]:
    """Get actual commands from AWS CLI for a service"""
    try:
        # Use boto3 to get commands (more reliable)
        from botocore.session import Session
        from botocore import xform_name
        
        session = Session()
        client = session.create_client(service, region_name='us-east-1')
        service_model = client._service_model
        operations = list(service_model.operation_names)
        
        # Convert to hyphen-case (AWS CLI format)
        # xform_name converts CamelCase to snake_case, we need to convert to hyphen-case
        commands = {xform_name(op).replace('_', '-') for op in operations}
        return commands
    except Exception as e:
        print(f"  ⚠️  Could not get commands for {service}: {e}")
        return set()

def load_our_data():
    """Load our AWS commands data from TypeScript file"""
    print("📂 Loading our data from lib/aws-commands.ts...")
    
    with open('lib/aws-commands.ts', 'r') as f:
        content = f.read()
    
    # Extract the awsServices array
    match = re.search(r'export const awsServices: Service\[\] = (\[[\s\S]*?\n\]);', content)
    if not match:
        print("❌ Could not parse aws-commands.ts")
        return []
    
    # Parse the JavaScript array
    data = eval(match.group(1))
    
    print(f"   Loaded {len(data)} services")
    total_commands = sum(len(s['commands']) for s in data)
    print(f"   Total commands: {total_commands}\n")
    
    return data

def verify_commands():
    """Main verification function"""
    print("🔍 AWS Command Verification\n")
    
    # Load current data
    current_data = load_our_data()
    print(f"✓ Loaded {len(current_data)} services\n")
    
    # Statistics
    total_commands = sum(len(s['commands']) for s in current_data)
    print(f"📊 Current Statistics:")
    print(f"   Services: {len(current_data)}")
    print(f"   Commands: {total_commands}\n")
    
    # Verification results
    issues = {
        'duplicates': defaultdict(list),
        'invalid': defaultdict(list),
        'missing': defaultdict(list)
    }
    
    verified_services = 0
    
    for service_data in current_data:
        service_name = service_data['name']
        our_commands = [cmd['name'] for cmd in service_data['commands']]
        
        print(f"🔍 Verifying {service_name}...")
        
        # Check for duplicates in our data
        seen = set()
        for cmd in our_commands:
            if cmd in seen:
                issues['duplicates'][service_name].append(cmd)
            seen.add(cmd)
        
        # Get actual commands from AWS CLI
        actual_commands = get_actual_commands(service_name)
        
        if not actual_commands:
            print(f"   ⚠️  Could not verify (skipping)")
            continue
        
        # Find invalid commands (in our data but not in AWS CLI)
        our_set = set(our_commands)
        invalid = our_set - actual_commands
        if invalid:
            issues['invalid'][service_name] = list(invalid)
        
        # Find missing commands (in AWS CLI but not in our data)
        missing = actual_commands - our_set
        if missing and len(missing) < 20:  # Only report if not too many
            issues['missing'][service_name] = list(missing)
        
        # Report
        status = "✓"
        if issues['duplicates'][service_name]:
            status = "⚠️  DUPLICATES"
        elif issues['invalid'][service_name]:
            status = "❌ INVALID"
        elif issues['missing'][service_name]:
            status = "⚠️  MISSING"
        
        print(f"   {status} {len(our_commands)} commands (AWS has {len(actual_commands)})")
        verified_services += 1
    
    # Generate report
    print(f"\n{'='*60}")
    print("📋 VERIFICATION REPORT")
    print(f"{'='*60}\n")
    
    print(f"✓ Verified {verified_services}/{len(current_data)} services\n")
    
    # Duplicates
    if any(issues['duplicates'].values()):
        print("⚠️  DUPLICATE COMMANDS FOUND:")
        for service, dups in issues['duplicates'].items():
            if dups:
                print(f"   {service}: {', '.join(dups)}")
        print()
    else:
        print("✓ No duplicate commands found\n")
    
    # Invalid commands
    if any(issues['invalid'].values()):
        print("❌ INVALID COMMANDS (not in AWS CLI):")
        for service, invalid in issues['invalid'].items():
            if invalid:
                print(f"   {service}: {', '.join(invalid[:5])}")
                if len(invalid) > 5:
                    print(f"      ... and {len(invalid)-5} more")
        print()
    else:
        print("✓ No invalid commands found\n")
    
    # Missing commands
    if any(issues['missing'].values()):
        print("ℹ️  MISSING COMMANDS (in AWS CLI but not in our data):")
        for service, missing in issues['missing'].items():
            if missing:
                print(f"   {service}: {len(missing)} commands")
        print()
    
    # Save detailed report
    report_file = 'reports/command-verification.json'
    import os
    os.makedirs('reports', exist_ok=True)
    
    with open(report_file, 'w') as f:
        json.dump({
            'verified_services': verified_services,
            'total_services': len(current_data),
            'duplicates': dict(issues['duplicates']),
            'invalid': dict(issues['invalid']),
            'missing': dict(issues['missing'])
        }, f, indent=2)
    
    print(f"💾 Detailed report saved to: {report_file}")
    
    # Summary
    dup_count = sum(len(v) for v in issues['duplicates'].values())
    inv_count = sum(len(v) for v in issues['invalid'].values())
    
    print(f"\n📊 Summary:")
    print(f"   Duplicate commands: {dup_count}")
    print(f"   Invalid commands: {inv_count}")
    print(f"   Services with issues: {len([s for s in issues['duplicates'] if issues['duplicates'][s]]) + len([s for s in issues['invalid'] if issues['invalid'][s]])}")

if __name__ == '__main__':
    verify_commands()
