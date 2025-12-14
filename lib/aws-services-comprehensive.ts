// Comprehensive AWS CLI Services Data
// This file contains extensive AWS service definitions with commands and parameters

import { Service } from './aws-commands';

// Common global parameters for all AWS CLI commands
const GLOBAL_PARAMS = [
    { name: "--debug", description: "Turn on debug logging" },
    { name: "--endpoint-url <value>", description: "Override command's default URL" },
    { name: "--no-verify-ssl", description: "Disable SSL certificate verification" },
    { name: "--no-paginate", description: "Disable automatic pagination" },
    { name: "--output <value>", description: "Output format (json|text|table|yaml)" },
    { name: "--query <value>", description: "JMESPath query string" },
    { name: "--profile <value>", description: "Use a specific profile" },
    { name: "--region <value>", description: "AWS region to use" },
    { name: "--version", description: "Display the version" },
    { name: "--color <value>", description: "Turn on/off color output" },
    { name: "--no-sign-request", description: "Do not sign requests" },
    { name: "--ca-bundle <value>", description: "CA certificate bundle" },
    { name: "--cli-read-timeout <value>", description: "Maximum socket read time" },
    { name: "--cli-connect-timeout <value>", description: "Maximum socket connect time" }
];

export const comprehensiveAWSServices: Service[] = [
    // This file is intentionally kept as a template
    // The actual comprehensive data will be generated programmatically
];

// For now, we'll use a generator function approach
export function generateComprehensiveServices(): Service[] {
    // Service definitions will be added here
    return [];
}
