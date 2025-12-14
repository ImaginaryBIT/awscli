#!/usr/bin/env node

/**
 * Simplified AWS CLI Data Extraction Script
 * Works with AWS CLI v2 by using a known list of services
 */

const { exec } = require('child_process');
const { promisify } = require('util');
const fs = require('fs').promises;
const path = require('path');

const execAsync = promisify(exec);

// Common AWS services to extract
const AWS_SERVICES = [
    'ec2', 's3', 's3api', 'lambda', 'dynamodb', 'rds', 'iam', 'cloudformation',
    'cloudwatch', 'sns', 'sqs', 'ecs', 'ecr', 'eks', 'elasticache', 'route53',
    'elb', 'elbv2', 'autoscaling', 'cloudfront', 'apigateway', 'cognito-idp',
    'secretsmanager', 'ssm', 'kms', 'acm', 'logs', 'events', 'kinesis', 'firehose'
];

async function getServiceCommands(serviceName) {
    try {
        const { stdout } = await execAsync(`aws ${serviceName} help 2>&1`);

        // Extract commands - look for lines that start with spaces and contain command names
        const commands = [];
        const lines = stdout.split('\n');
        let inCommandsSection = false;

        for (const line of lines) {
            if (line.includes('AVAILABLE COMMANDS') || line.includes('Available Commands')) {
                inCommandsSection = true;
                continue;
            }

            if (inCommandsSection) {
                // Stop at next section
                if (line.match(/^[A-Z]/)) {
                    break;
                }

                // Extract command name (lines with bullet points or indented)
                const match = line.match(/^\s+[o•]\s+([a-z0-9-]+)/);
                if (match && !match[1].includes('help') && !match[1].includes('wait')) {
                    commands.push(match[1]);
                }
            }
        }

        return commands.slice(0, 15); // Limit to 15 commands per service
    } catch (error) {
        console.error(`    Error getting commands for ${serviceName}`);
        return [];
    }
}

async function getCommandParameters(serviceName, commandName) {
    try {
        const { stdout } = await execAsync(`aws ${serviceName} ${commandName} help 2>&1`);

        const parameters = [];
        const lines = stdout.split('\n');
        let inOptionsSection = false;
        let currentParam = null;

        for (const line of lines) {
            if (line.includes('OPTIONS') && !line.includes('GLOBAL OPTIONS')) {
                inOptionsSection = true;
                continue;
            }

            if (inOptionsSection) {
                // Stop at next major section
                if (line.match(/^[A-Z][A-Z]/)) {
                    if (currentParam) parameters.push(currentParam);
                    break;
                }

                // New parameter starts with --
                if (line.match(/^\s+--/)) {
                    if (currentParam) parameters.push(currentParam);

                    const paramMatch = line.match(/^\s+(--[^\s]+(?:\s+<[^>]+>)?)/);
                    if (paramMatch) {
                        currentParam = {
                            name: paramMatch[1].trim(),
                            description: line.substring(paramMatch.index + paramMatch[0].length).trim()
                        };
                    }
                } else if (currentParam && line.trim() && !line.match(/^\s+[A-Z]/)) {
                    // Continue description
                    currentParam.description += ' ' + line.trim();
                }
            }
        }

        if (currentParam) parameters.push(currentParam);
        return parameters.slice(0, 20); // Limit to 20 parameters per command
    } catch (error) {
        return [];
    }
}

async function extractServiceData(serviceName) {
    console.log(`\n📦 Processing ${serviceName}...`);

    const commands = await getServiceCommands(serviceName);
    console.log(`   Found ${commands.length} commands`);

    const serviceData = {
        name: serviceName,
        description: `Amazon ${serviceName.toUpperCase()} Service`,
        commands: []
    };

    for (const command of commands) {
        const parameters = await getCommandParameters(serviceName, command);
        serviceData.commands.push({
            name: command,
            description: `${command} command for ${serviceName}`,
            parameters
        });
        console.log(`   ✓ ${command} (${parameters.length} params)`);
    }

    return serviceData;
}

async function main() {
    console.log('🚀 AWS CLI Data Extraction Tool (Simplified)\n');
    console.log(`Extracting data for ${AWS_SERVICES.length} services...\n`);

    const allData = [];
    let totalCommands = 0;
    let totalParams = 0;

    for (const service of AWS_SERVICES) {
        try {
            const serviceData = await extractServiceData(service);
            allData.push(serviceData);

            totalCommands += serviceData.commands.length;
            totalParams += serviceData.commands.reduce((sum, cmd) => sum + cmd.parameters.length, 0);
        } catch (error) {
            console.error(`❌ Error processing ${service}:`, error.message);
        }
    }

    // Save to file
    const outputPath = path.join(__dirname, '..', 'lib', 'aws-commands-extracted.json');
    await fs.writeFile(outputPath, JSON.stringify(allData, null, 2));

    console.log(`\n✅ Extraction Complete!\n`);
    console.log(`📊 Statistics:`);
    console.log(`   Services: ${allData.length}`);
    console.log(`   Commands: ${totalCommands}`);
    console.log(`   Parameters: ${totalParams}`);
    console.log(`\n💾 Saved to: ${outputPath}`);
}

main().catch(console.error);
