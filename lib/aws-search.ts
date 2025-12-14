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
        { name: 'service', weight: 0.5 },        // Prioritize service name matches
        { name: 'command', weight: 0.3 },        // Then command name matches
        { name: 'displayText', weight: 0.2 }     // Finally full text matches
    ],
    threshold: 0.3,              // Stricter matching (was 0.4)
    distance: 50,                // Shorter distance for tighter matching (was 100)
    minMatchCharLength: 2,
    includeScore: true,
    ignoreLocation: false,       // Prioritize matches at beginning (was true)
    findAllMatches: false,       // Stop after first match
    useExtendedSearch: false,
    location: 0                  // Start matching from beginning of string
});

export function searchAWSCommands(query: string): SearchResult[] {
    if (!query || query.trim().length === 0) {
        return [];
    }

    const trimmedQuery = query.trim().toLowerCase();

    // Special case: if user types just "aws", show list of services
    if (trimmedQuery === 'aws') {
        return awsServices.slice(0, 50).map(service => ({
            displayText: `aws ${service.name}`,
            fullCommand: `aws ${service.name}`,
            service: service.name,
            command: '',
            parameters: []
        }));
    }

    // Check if query matches a service name exactly or starts with it
    const exactServiceMatch = awsServices.find(s => s.name === trimmedQuery);
    const servicePrefix = trimmedQuery.split(' ')[0];
    const matchingService = awsServices.find(s => s.name === servicePrefix);

    // If exact service match, show only that service's commands
    if (exactServiceMatch) {
        return exactServiceMatch.commands.slice(0, 50).map(cmd => ({
            displayText: `aws ${exactServiceMatch.name} ${cmd.name}`,
            fullCommand: `aws ${exactServiceMatch.name} ${cmd.name}`,
            service: exactServiceMatch.name,
            command: cmd.name,
            parameters: cmd.parameters
        }));
    }

    // Use Fuse.js for fuzzy search
    const results = fuse.search(trimmedQuery);

    // Filter results: if query matches a service name, only show commands from that service
    let filteredResults = results;
    if (matchingService) {
        filteredResults = results.filter(r => r.item.service === matchingService.name);
    } else {
        // For non-service queries, filter out very weak matches (score > 0.5)
        filteredResults = results.filter(r => (r.score || 0) < 0.5);
    }

    // Convert Fuse results to our format and limit to 50
    return filteredResults
        .slice(0, 50)
        .map(result => ({
            ...result.item,
            score: result.score
        }));
}

// Export services for direct access if needed
export { awsServices, type Service, type Command };
