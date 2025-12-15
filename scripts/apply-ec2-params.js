const fs = require('fs');
const path = require('path');

console.log('🔄 Applying EC2 Parameter Data\n');

// Load EC2 extracted data
const ec2Data = JSON.parse(fs.readFileSync('.dev-data/ec2-parameters-extracted.json', 'utf8'));
console.log(`📂 Loaded EC2 data: ${ec2Data.commands.length} commands`);

const totalParams = ec2Data.commands.reduce((sum, cmd) => sum + (cmd.parameters?.length || 0), 0);
console.log(`   Parameters: ${totalParams}\n`);

// Load current aws-commands.ts
const tsContent = fs.readFileSync('lib/aws-commands.ts', 'utf8');
const match = tsContent.match(/export const awsServices: Service\[\] = (\[[\s\S]*?\n\]);/);
const data = eval(match[1]);

// Find EC2 service and replace
const ec2Index = data.findIndex(s => s.name === 'ec2');
data[ec2Index] = ec2Data;

console.log('✅ Replaced EC2 data\n');

// Backup
const backupPath = '.dev-data/aws-commands.backup-before-ec2-params.ts';
fs.copyFileSync('lib/aws-commands.ts', backupPath);
console.log(`💾 Backup saved to: ${backupPath}`);

// Generate new TypeScript file
const newContent = `// AWS CLI command structure
export interface CommandParameter {
  name: string;
  description?: string;
}

export interface Command {
  name: string;
  description?: string;
  parameters: CommandParameter[];
}

export interface Service {
  name: string;
  description?: string;
  commands: Command[];
}

// AWS CLI data structure
export const awsServices: Service[] = ${JSON.stringify(data, null, 2)};
`;

fs.writeFileSync('lib/aws-commands.ts', newContent);
console.log(`💾 Applied to: lib/aws-commands.ts\n`);

// Final stats
const totalCommands = data.reduce((sum, s) => sum + s.commands.length, 0);
const totalParameters = data.reduce((sum, s) => 
  sum + s.commands.reduce((cmdSum, c) => cmdSum + (c.parameters?.length || 0), 0), 0);

console.log('📊 Final Statistics:');
console.log(`   Services: ${data.length}`);
console.log(`   Commands: ${totalCommands}`);
console.log(`   Parameters: ${totalParameters}`);
console.log(`\n✅ Complete! EC2 now has comprehensive parameter coverage.`);
