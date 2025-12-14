#!/usr/bin/env node

/**
 * Re-merge extracted parameters with cleaned commands
 * Strategy: Use extracted params if they have MORE parameters than existing
 */

const fs = require('fs');
const path = require('path');

console.log('🔄 Re-Merging Parameters (Smart Strategy)\n');

// Load extracted parameters
const extractedPath = path.join(__dirname, '..', '.dev-data', 'parameters-extracted.json');
const extractedData = JSON.parse(fs.readFileSync(extractedPath, 'utf8'));

console.log(`📂 Loaded extracted data:`);
const extractedParams = extractedData.reduce((sum, s) => 
  sum + s.commands.reduce((cmdSum, c) => cmdSum + c.parameters.length, 0), 0);
console.log(`   Parameters: ${extractedParams}\n`);

// Create a map of extracted data
const extractedMap = new Map();
extractedData.forEach(service => {
  const commandMap = new Map();
  service.commands.forEach(cmd => {
    commandMap.set(cmd.name, cmd.parameters);
  });
  extractedMap.set(service.name, commandMap);
});

// Load current data
const currentPath = path.join(__dirname, '..', 'lib', 'aws-commands.ts');
const currentContent = fs.readFileSync(currentPath, 'utf8');

const match = currentContent.match(/export const awsServices: Service\[\] = (\[[\s\S]*?\n\]);/);
if (!match) {
  console.error('❌ Could not parse aws-commands.ts');
  process.exit(1);
}

const currentData = eval(match[1]);

console.log(`📂 Loaded current data:`);
const currentParams = currentData.reduce((sum, s) => 
  sum + s.commands.reduce((cmdSum, c) => cmdSum + c.parameters.length, 0), 0);
console.log(`   Parameters: ${currentParams}\n`);

// Smart merge: use extracted if it has MORE parameters
let replaced = 0;
let preserved = 0;
let added = 0;

currentData.forEach(service => {
  const extractedCommands = extractedMap.get(service.name);
  
  if (extractedCommands) {
    service.commands.forEach(command => {
      const extractedParams = extractedCommands.get(command.name);
      
      if (extractedParams) {
        const currentParamCount = command.parameters ? command.parameters.length : 0;
        const extractedParamCount = extractedParams.length;
        
        if (extractedParamCount > currentParamCount) {
          // Use extracted (more comprehensive)
          command.parameters = extractedParams;
          replaced++;
          console.log(`  ✓ ${service.name}/${command.name}: ${currentParamCount} → ${extractedParamCount} params`);
        } else if (currentParamCount > 0) {
          // Keep existing (already comprehensive)
          preserved++;
        } else if (extractedParamCount > 0) {
          // Add extracted (was empty)
          command.parameters = extractedParams;
          added++;
        }
      } else if (!command.parameters) {
        command.parameters = [];
      }
    });
  }
});

console.log(`\n✅ Smart Merge Complete!`);
console.log(`   Replaced (extracted had more): ${replaced}`);
console.log(`   Preserved (existing had more): ${preserved}`);
console.log(`   Added (was empty): ${added}\n`);

// Generate final TypeScript file
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
export const awsServices: Service[] = ${JSON.stringify(currentData, null, 2)};
`;

// Backup current file
const backupPath = path.join(__dirname, '..', '.dev-data', `aws-commands.backup-${new Date().toISOString().split('T')[0]}-remerge.ts`);
fs.copyFileSync(currentPath, backupPath);
console.log(`💾 Backup saved to: ${backupPath}`);

// Save updated data
fs.writeFileSync(currentPath, tsContent);
console.log(`💾 Updated: ${currentPath}\n`);

// Final statistics
const finalParams = currentData.reduce((sum, s) => 
  sum + s.commands.reduce((cmdSum, c) => cmdSum + c.parameters.length, 0), 0);

console.log(`📊 Final Statistics:`);
console.log(`   Services: ${currentData.length}`);
console.log(`   Commands: ${currentData.reduce((sum, s) => sum + s.commands.length, 0)}`);
console.log(`   Parameters: ${finalParams} (was ${currentParams})`);
console.log(`   Improvement: +${finalParams - currentParams} parameters`);
