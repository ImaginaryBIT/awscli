'use client';

import { useState, useEffect, useRef } from 'react';
import { searchAWSCommands } from '@/lib/aws-commands';

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [showParameters, setShowParameters] = useState(false);
    const [currentParameters, setCurrentParameters] = useState<any[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (query.trim() === '') {
            setSuggestions([]);
            setShowParameters(false);
            setCurrentParameters([]);
            return;
        }

        const results = searchAWSCommands(query);
        setSuggestions(results);
        setSelectedIndex(-1);

        // Check if we have a complete command with parameters
        const parts = query.toLowerCase().trim().split(/\s+/);
        const cleanParts = parts[0] === 'aws' ? parts.slice(1) : parts;

        if (cleanParts.length >= 2) {
            // Import awsServices to check for exact matches
            const { awsServices } = require('@/lib/aws-commands');
            const service = awsServices.find((s: any) => s.name.toLowerCase() === cleanParts[0]);

            if (service) {
                const command = service.commands.find((c: any) => c.name.toLowerCase() === cleanParts[1]);

                if (command && command.parameters) {
                    setShowParameters(true);
                    setCurrentParameters(command.parameters);
                    return;
                }
            }
        }

        setShowParameters(false);
        setCurrentParameters([]);
    }, [query]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev =>
                prev < suggestions.length - 1 ? prev + 1 : prev
            );
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
            e.preventDefault();
            handleSuggestionClick(suggestions[selectedIndex]);
        } else if (e.key === 'Escape') {
            setSuggestions([]);
            setShowParameters(false);
        }
    };

    const handleSuggestionClick = (suggestion: any) => {
        setQuery(suggestion.fullCommand || suggestion.displayText);
        setSuggestions([]);

        if (suggestion.parameters && suggestion.parameters.length > 0) {
            setShowParameters(true);
            setCurrentParameters(suggestion.parameters);
        }

        inputRef.current?.focus();
    };

    const handleParameterClick = (paramName: string) => {
        // Extract just the parameter flag (e.g., "--instance-ids" from "--instance-ids <value>")
        const paramFlag = paramName.split(' ')[0];

        // Append parameter to current query with a space
        const newQuery = query.trim() + ' ' + paramFlag;
        setQuery(newQuery);

        // Keep focus on input for easy editing
        inputRef.current?.focus();
    };

    useEffect(() => {
        if (selectedIndex >= 0 && suggestionsRef.current) {
            const selectedElement = suggestionsRef.current.children[selectedIndex] as HTMLElement;
            if (selectedElement) {
                selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }
        }
    }, [selectedIndex]);

    return (
        <div className="w-full max-w-2xl mx-auto px-4">
            <div className="relative">
                {/* Search Input - Google Style */}
                <div className="relative group">
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Search AWS CLI commands..."
                        className="w-full pl-12 pr-6 py-6 text-base bg-white border border-gray-300 rounded-full 
                     text-gray-900 placeholder-gray-500 outline-none
                     hover:bg-gray-50 hover:border-gray-400 hover:shadow-md
                     focus:bg-white focus:border-blue-500 focus:shadow-lg focus:ring-2 focus:ring-blue-200
                     transition-all duration-200"
                    />
                    {/* Search Icon - Keep small (w-5 h-5) */}
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {/* Suggestions Dropdown - Light Theme */}
                {suggestions.length > 0 && !showParameters && (
                    <div
                        ref={suggestionsRef}
                        className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-3xl 
                     shadow-xl overflow-hidden z-50
                     animate-in fade-in slide-in-from-top-2 duration-200"
                    >
                        <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                            {suggestions.map((suggestion, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className={`px-5 py-4 cursor-pointer transition-colors duration-150 border-b border-gray-100 last:border-b-0
                            ${selectedIndex === index
                                            ? 'bg-gray-100'
                                            : 'hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <code className="text-gray-900 font-mono text-base">
                                            {suggestion.displayText}
                                        </code>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Parameters Display - Light Theme, No Large Icons */}
                {showParameters && currentParameters.length > 0 && (
                    <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-3xl 
                        shadow-xl overflow-hidden z-50
                        animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="px-5 py-3 bg-gray-50 border-b border-gray-200">
                            <h3 className="text-gray-900 font-medium text-sm">
                                Available Parameters
                            </h3>
                        </div>
                        <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
                            <div className="p-2">
                                {currentParameters.map((param, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleParameterClick(param.name)}
                                        className="group px-4 py-4 hover:bg-gray-50 rounded-2xl mb-2 border-b border-gray-100 last:border-b-0 last:mb-0
                             transition-colors duration-150 cursor-pointer"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex-1">
                                                <code className="text-blue-600 font-mono text-base font-medium block">
                                                    {param.name}
                                                </code>
                                                {param.description && (
                                                    <p className="text-gray-600 text-xs mt-1.5 leading-relaxed">
                                                        {param.description}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-gray-400 group-hover:text-blue-600 transition-colors text-xs mt-0.5 whitespace-nowrap">
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                </svg>
                                                <span>Add</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Helper Text - Light Theme */}
            <div className="mt-4 text-center">
                <p className="text-gray-500 text-xs flex items-center justify-center gap-2">
                    {query.trim() === '' && (
                        <>
                            <span>Start typing to search</span>
                            <span className="text-gray-400">•</span>
                            <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-[10px] text-gray-700">↑↓</kbd>
                            <span>to navigate</span>
                        </>
                    )}
                    {query.trim() !== '' && suggestions.length === 0 && !showParameters && "No matches found"}
                    {suggestions.length > 0 && (
                        <>
                            <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-[10px] text-gray-700">↑↓</kbd>
                            <span>to navigate</span>
                            <span className="text-gray-400">•</span>
                            <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-[10px] text-gray-700">Enter</kbd>
                            <span>to select</span>
                        </>
                    )}
                    {showParameters && (
                        <>
                            <span>{currentParameters.length} parameters</span>
                            <span className="text-gray-400">•</span>
                            <span>Click to add to command</span>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
}
