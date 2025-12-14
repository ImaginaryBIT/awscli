#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔄 Applying Full Parameter Data\n');

// Load full extracted data
const fullDataPath = path.join(__dirname, '..', '.dev-data', 'parameters-extracted-full.json');
const fullData = JSON.parse(fs.readFileSync(fullDataPath, 'utf8'));

console.log(`📂 Loaded full extracted data:`);
const totalParams = fullData.reduce((sum, s) => 
  sum + s.commands.reduce((cmdSum, c) => cmdSum + c.parameters.length, 0), 0);
console.log(`   Parameters: ${totalParams}\n`);

// Generate TypeScript file
const tsContent = `// AWS CLI command structure
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
export const awsServices: Service[] = ${JSON.stringify(fullData, null, 2)};
`;

// Backup current file
const currentPath = path.join(__dirname, '..', 'lib', 'aws-commands.ts');
const backupPath = path.join(__dirname, '..', '.dev-data', `aws-commands.backup-before-full-params.ts`);
fs.copyFileSync(currentPath, backupPath);
console.log(`💾 Backup saved to: ${backupPath}`);

// Apply new data
fs.writeFileSync(currentPath, tsContent);
console.log(`💾 Applied to: ${currentPath}\n`);

// Final statistics
console.log(`📊 Final Statistics:`);
console.log(`   Services: ${fullData.length}`);
console.log(`   Commands: ${fullData.reduce((sum, s) => sum + s.commands.length, 0)}`);
console.log(`   Parameters: ${totalParams}`);
console.log(`\n✅ Complete! Your AWS CLI search now has comprehensive parameter coverage.`);
