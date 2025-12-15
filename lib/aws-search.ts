// AWS CLI command search with Fuse.js fuzzy matching
import Fuse from 'fuse.js';
import { awsServices, Service, Command } from './aws-commands';

export interface SearchResult {
    displayText: string;
    fullCommand: string;
    service: string;
    command: string;
    parameters?: any[];
    score?: number;
}

// Build flat list of all commands for searching
function buildSearchableCommands(): SearchResult[] {
    const searchableCommands: SearchResult[] = [];

    awsServices.forEach(service => {
        service.commands.forEach(command => {
            searchableCommands.push({
                displayText: `aws ${service.name} ${command.name}`,
                fullCommand: `aws ${service.name} ${command.name}`,
                service: service.name,
                command: command.name,
                parameters: command.parameters
            });
        });
    });

    return searchableCommands;
}

// Configure Fuse.js for fuzzy search
const searchableCommands = buildSearchableCommands();

const fuse = new Fuse(searchableCommands, {
    keys: [
        { name: 'command', weight: 0.6 },        // Prioritize command name matches most
        { name: 'service', weight: 0.3 },        // Then service name matches
        { name: 'displayText', weight: 0.1 }     // Finally full text matches
    ],
    threshold: 0.4,              // More lenient for fuzzy matching
    distance: 100,               // Allow matches further in the string
    minMatchCharLength: 2,
    includeScore: true,
    ignoreLocation: true,        // Don't require matches at beginning
    findAllMatches: false,
    useExtendedSearch: false
});

export function searchAWSCommands(query: string): SearchResult[] {
    if (!query || query.trim().length === 0) {
        return [];
    }

    let trimmedQuery = query.trim().toLowerCase();

    // Remove 'aws' prefix if present
    if (trimmedQuery.startsWith('aws ')) {
        trimmedQuery = trimmedQuery.substring(4).trim();
    }

    // Special case: if user types just "aws", show list of services
    if (trimmedQuery === '' || query.trim().toLowerCase() === 'aws') {
        return awsServices.slice(0, 100).map(service => ({
            displayText: `aws ${service.name}`,
            fullCommand: `aws ${service.name}`,
            service: service.name,
            command: '',
            parameters: []
        }));
    }

    // Check if query matches a service name exactly
    const exactServiceMatch = awsServices.find(s => s.name === trimmedQuery);

    // If exact service match, show only that service's commands
    if (exactServiceMatch) {
        return exactServiceMatch.commands.slice(0, 100).map(cmd => ({
            displayText: `aws ${exactServiceMatch.name} ${cmd.name}`,
            fullCommand: `aws ${exactServiceMatch.name} ${cmd.name}`,
            service: exactServiceMatch.name,
            command: cmd.name,
            parameters: cmd.parameters
        }));
    }

    // Check if query starts with a service name (e.g., "ec2 describe" or "ec2 security")
    const queryParts = trimmedQuery.split(' ');
    const firstPart = queryParts[0];
    const matchingService = awsServices.find(s => s.name === firstPart);

    // If query starts with service name, search within that service only
    if (matchingService && queryParts.length > 1) {
        const commandQuery = queryParts.slice(1).join(' ');
        const serviceResults = fuse.search(commandQuery).filter(r => r.item.service === matchingService.name);
        return serviceResults
            .slice(0, 100)
            .map(result => ({
                ...result.item,
                score: result.score
            }));
    }

    // Use Fuse.js for fuzzy search across all services
    const results = fuse.search(trimmedQuery);

    // Convert Fuse results to our format and limit to 100
    return results
        .slice(0, 100)
        .map(result => ({
            ...result.item,
            score: result.score
        }));
}

// Export services for direct access if needed
export { awsServices, type Service, type Command };
