#!/usr/bin/env node

/**
 * Merge extracted AWS data with existing data
 * Combines new services from extraction with existing comprehensive data
 */

const fs = require('fs');
const path = require('path');

// Read extracted data
const extractedPath = path.join(__dirname, '..', 'lib', 'aws-commands-extracted.json');
const extractedData = JSON.parse(fs.readFileSync(extractedPath, 'utf8'));

console.log('📊 Extracted Data:');
console.log(`   Services: ${extractedData.length}`);
console.log(`   Commands: ${extractedData.reduce((sum, s) => sum + s.commands.length, 0)}`);

// Read existing data from aws-commands.ts
const existingPath = path.join(__dirname, '..', 'lib', 'aws-commands.ts');
const existingContent = fs.readFileSync(existingPath, 'utf8');

// Extract the awsServices array from the TypeScript file
const match = existingContent.match(/export const awsServices: Service\[\] = (\[[\s\S]*?\n\]);/);
if (!match) {
    console.error('❌ Could not find awsServices array in existing file');
    process.exit(1);
}

const existingData = eval(match[1]); // Parse the JavaScript array

console.log('\n📊 Existing Data:');
console.log(`   Services: ${existingData.length}`);
console.log(`   Commands: ${existingData.reduce((sum, s) => sum + s.commands.length, 0)}`);
console.log(`   Parameters: ${existingData.reduce((sum, s) =>
    sum + s.commands.reduce((cmdSum, c) => cmdSum + c.parameters.length, 0), 0)}`);

// Merge: Keep existing data (has parameters), add new services from extracted
const existingServiceNames = new Set(existingData.map(s => s.name));
const newServices = extractedData.filter(s => !existingServiceNames.has(s.name));

console.log(`\n✨ New services to add: ${newServices.length}`);
newServices.forEach(s => console.log(`   - ${s.name} (${s.commands.length} commands)`));

// Combine data
const mergedData = [...existingData, ...newServices];

console.log('\n📊 Merged Data:');
console.log(`   Services: ${mergedData.length}`);
console.log(`   Commands: ${mergedData.reduce((sum, s) => sum + s.commands.length, 0)}`);

// Generate TypeScript content
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
export const awsServices: Service[] = ${JSON.stringify(mergedData, null, 2)};

// Search function
export interface SearchResult {
  type: 'service' | 'command';
  service: string;
  command?: string;
  displayText: string;
  fullCommand: string;
  parameters?: CommandParameter[];
}

export function searchAWSCommands(query: string): SearchResult[] {
  const results: SearchResult[] = [];
  const lowerQuery = query.toLowerCase().trim();

  if (!lowerQuery) {
    return results;
  }

  const parts = lowerQuery.split(/\\s+/);
  const cleanParts = parts.filter(p => p !== 'aws');
  const servicePart = cleanParts[0] || '';
  const commandPart = cleanParts.slice(1).join('-') || '';

  // If we only have one part (searching for services or service commands)
  if (cleanParts.length === 1) {
    const matchingServices = awsServices.filter(s =>
      s.name.toLowerCase().includes(servicePart)
    );

    matchingServices.forEach(service => {
      service.commands.forEach(command => {
        results.push({
          type: 'command' as const,
          service: service.name,
          command: command.name,
          displayText: \`aws \${service.name} \${command.name}\`,
          fullCommand: \`aws \${service.name} \${command.name}\`,
          parameters: command.parameters
        });
      });
    });

    return results;
  }

  // If we have service and command parts (searching for commands)
  if (cleanParts.length >= 2) {
    const service = awsServices.find(s => s.name.toLowerCase() === servicePart);

    if (service) {
      const matchingCommands = service.commands.filter(cmd =>
        commandPart === '' || cmd.name.toLowerCase().includes(commandPart)
      );

      matchingCommands.forEach(command => {
        results.push({
          type: 'command' as const,
          service: service.name,
          command: command.name,
          displayText: \`aws \${service.name} \${command.name}\`,
          fullCommand: \`aws \${service.name} \${command.name}\`,
          parameters: command.parameters
        });
      });
    }
  }

  return results;
}
`;

// Write merged data back to aws-commands.ts
const outputPath = path.join(__dirname, '..', 'lib', 'aws-commands-merged.ts');
fs.writeFileSync(outputPath, tsContent);

console.log(`\n✅ Merged data saved to: ${outputPath}`);
console.log('\n💡 Next steps:');
console.log('   1. Review the merged data');
console.log('   2. Backup your current aws-commands.ts');
console.log('   3. Replace aws-commands.ts with aws-commands-merged.ts');
console.log('   4. Update imports to use aws-search.ts (already done)');
