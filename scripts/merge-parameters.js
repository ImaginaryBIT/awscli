#!/usr/bin/env node

/**
 * Merge extracted parameters with cleaned commands
 * Preserves existing high-quality parameters and adds new ones
 */

const fs = require('fs');
const path = require('path');

console.log('🔄 Merging Parameters with Commands\n');

// Load extracted parameters
const extractedPath = path.join(__dirname, '..', 'lib', 'parameters-extracted.json');
const extractedData = JSON.parse(fs.readFileSync(extractedPath, 'utf8'));

console.log(`📂 Loaded extracted data:`);
console.log(`   Services: ${extractedData.length}`);
const extractedCommands = extractedData.reduce((sum, s) => sum + s.commands.length, 0);
const extractedParams = extractedData.reduce((sum, s) =>
    sum + s.commands.reduce((cmdSum, c) => cmdSum + c.parameters.length, 0), 0);
console.log(`   Commands: ${extractedCommands}`);
console.log(`   Parameters: ${extractedParams}\n`);

// Create a map of extracted data for easy lookup
const extractedMap = new Map();
extractedData.forEach(service => {
    const commandMap = new Map();
    service.commands.forEach(cmd => {
        commandMap.set(cmd.name, cmd.parameters);
    });
    extractedMap.set(service.name, commandMap);
});

// Load cleaned commands
const cleanedPath = path.join(__dirname, '..', 'lib', 'aws-commands-cleaned.ts');
const cleanedContent = fs.readFileSync(cleanedPath, 'utf8');

// Extract the awsServices array
const match = cleanedContent.match(/export const awsServices: Service\[\] = (\[[\s\S]*?\n\]);/);
if (!match) {
    console.error('❌ Could not parse aws-commands-cleaned.ts');
    process.exit(1);
}

const cleanedData = eval(match[1]);

console.log(`📂 Loaded cleaned data:`);
console.log(`   Services: ${cleanedData.length}`);
const cleanedCommands = cleanedData.reduce((sum, s) => sum + s.commands.length, 0);
const cleanedParams = cleanedData.reduce((sum, s) =>
    sum + s.commands.reduce((cmdSum, c) => cmdSum + c.parameters.length, 0), 0);
console.log(`   Commands: ${cleanedCommands}`);
console.log(`   Parameters: ${cleanedParams}\n`);

// Merge parameters
let paramsAdded = 0;
let paramsPreserved = 0;

cleanedData.forEach(service => {
    const extractedCommands = extractedMap.get(service.name);

    if (extractedCommands) {
        service.commands.forEach(command => {
            const extractedParams = extractedCommands.get(command.name);

            if (extractedParams && extractedParams.length > 0) {
                // If command has no parameters or empty array, use extracted
                if (!command.parameters || command.parameters.length === 0) {
                    command.parameters = extractedParams;
                    paramsAdded += extractedParams.length;
                } else {
                    // Preserve existing parameters (they're higher quality)
                    paramsPreserved += command.parameters.length;
                }
            } else if (!command.parameters) {
                // Ensure parameters array exists
                command.parameters = [];
            }
        });
    } else {
        // Ensure all commands have parameters array
        service.commands.forEach(cmd => {
            if (!cmd.parameters) {
                cmd.parameters = [];
            }
        });
    }
});

console.log(`✅ Merge complete!`);
console.log(`   Parameters added: ${paramsAdded}`);
console.log(`   Parameters preserved: ${paramsPreserved}\n`);

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
export const awsServices: Service[] = ${JSON.stringify(cleanedData, null, 2)};
`;

// Save merged data
const outputPath = path.join(__dirname, '..', 'lib', 'aws-commands-final.ts');
fs.writeFileSync(outputPath, tsContent);

console.log(`💾 Saved to: ${outputPath}\n`);

// Final statistics
const finalCommands = cleanedData.reduce((sum, s) => sum + s.commands.length, 0);
const finalParams = cleanedData.reduce((sum, s) =>
    sum + s.commands.reduce((cmdSum, c) => cmdSum + c.parameters.length, 0), 0);

console.log(`📊 Final Statistics:`);
console.log(`   Services: ${cleanedData.length}`);
console.log(`   Commands: ${finalCommands}`);
console.log(`   Parameters: ${finalParams}`);
console.log(`\n✅ Ready to integrate!`);
console.log(`\nNext steps:`);
console.log(`   1. Review: lib/aws-commands-final.ts`);
console.log(`   2. Backup: cp lib/aws-commands.ts lib/aws-commands.backup-$(date +%Y%m%d).ts`);
console.log(`   3. Replace: mv lib/aws-commands-final.ts lib/aws-commands.ts`);
console.log(`   4. Test search functionality`);
