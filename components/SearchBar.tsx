'use client';

import { useState, useEffect, useRef } from 'react';
import { searchAWSCommands } from '@/lib/aws-search';

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [showParameters, setShowParameters] = useState(false);
    const [currentParameters, setCurrentParameters] = useState<any[]>([]);
    const [inputHovered, setInputHovered] = useState(false);
    const [inputFocused, setInputFocused] = useState(false);
    const [hoveredParamIndex, setHoveredParamIndex] = useState(-1);
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
        <div className="w-full mx-auto px-4">
            {/* Helper Text - moved above the input to avoid overlapping the dropdown */}
            <div className="mb-3 text-center">
                <p style={{ color: '#6b7280', fontSize: '14px' }} className="flex items-center justify-center gap-2">
                    {query.trim() === '' && (
                        <>
                            <span>Start typing to search</span>
                            <span style={{ color: '#9ca3af' }}>•</span>
                            <kbd style={{
                                padding: '2px 6px',
                                backgroundColor: '#f3f4f6',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                fontSize: '10px',
                                color: '#374151'
                            }}>↑↓</kbd>
                            <span>to navigate</span>
                        </>
                    )}
                    {query.trim() !== '' && suggestions.length === 0 && !showParameters && "No matches found"}
                    {suggestions.length > 0 && (
                        <>
                            <kbd style={{
                                padding: '2px 6px',
                                backgroundColor: '#f3f4f6',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                fontSize: '10px',
                                color: '#374151'
                            }}>↑↓</kbd>
                            <span>to navigate</span>
                            <span style={{ color: '#9ca3af' }}>•</span>
                            <kbd style={{
                                padding: '2px 6px',
                                backgroundColor: '#f3f4f6',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                fontSize: '10px',
                                color: '#374151'
                            }}>Enter</kbd>
                            <span>to select</span>
                        </>
                    )}
                    {showParameters && (
                        <>
                            <span style={{ color: '#d1d5db', margin: '0 4px' }}>|</span>
                            {currentParameters.length > 0 ? (
                                <>
                                    <span>{currentParameters.length} parameters</span>
                                    <span style={{ color: '#9ca3af' }}>•</span>
                                    <span>Click to add to command</span>
                                </>
                            ) : (
                                <span>No parameters available for this command</span>
                            )}
                        </>
                    )}
                </p>
            </div>
            <div className="relative">

                <div className="relative group">
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onMouseEnter={() => setInputHovered(true)}
                        onMouseLeave={() => setInputHovered(false)}
                        onFocus={() => setInputFocused(true)}
                        onBlur={() => setInputFocused(false)}
                        placeholder="Search AWS CLI commands..."
                        style={{
                            height: '40px',
                            fontSize: '18px',
                            width: '100%',
                            paddingLeft: '40px',
                            paddingRight: '16px',
                            backgroundColor: inputFocused ? '#ffffff' : (inputHovered ? '#f9fafb' : '#ffffff'),
                            border: inputFocused ? '1px solid #3b82f6' : (inputHovered ? '1px solid #9ca3af' : '1px solid #d1d5db'),
                            borderRadius: '9999px',
                            color: '#111827',
                            outline: 'none',
                            boxShadow: inputFocused ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 0 0 3px rgba(59, 130, 246, 0.1)' : (inputHovered ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'),
                            transition: 'all 0.2s'
                        }}
                        className="placeholder-gray-500"
                    />
                    {/* Search Icon - Keep small (w-5 h-5) */}
                    <div style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                        <svg
                            style={{ width: '20px', height: '20px', color: '#9ca3af' }}
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
                        style={{
                            position: 'absolute',
                            top: '100%',
                            marginTop: '8px',
                            width: '108%',
                            backgroundColor: '#ffffff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '24px',
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                            overflow: 'hidden',
                            zIndex: 50
                        }}
                        className="animate-in fade-in slide-in-from-top-2 duration-200"
                    >
                        <div style={{ maxHeight: '400px', overflowY: 'auto' }} className="custom-scrollbar">
                            {suggestions.map((suggestion, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    style={{
                                        backgroundColor: selectedIndex === index ? '#e5e7eb' : 'transparent',
                                        padding: '16px',
                                        cursor: 'pointer',
                                        transition: 'colors 0.15s',
                                        borderBottom: '1px solid #f3f4f6'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (selectedIndex !== index) {
                                            e.currentTarget.style.backgroundColor = '#f9fafb';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (selectedIndex !== index) {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                        }
                                    }}
                                    className="last:border-b-0"
                                >
                                    <div className="flex items-center gap-3">
                                        <code className="text-gray-900 font-mono" style={{ fontSize: '18px' }}>
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
                    <div style={{
                        position: 'absolute',
                        top: '100%',
                        marginTop: '8px',
                        width: '108%',
                        backgroundColor: '#ffffff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '24px',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                        overflow: 'hidden',
                        zIndex: 50
                    }} className="animate-in fade-in slide-in-from-top-2 duration-200">
                        <div style={{ padding: '12px 20px', backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                            <h3 style={{ color: '#111827', fontWeight: 500, fontSize: '14px' }}>
                                Available Parameters
                            </h3>
                        </div>
                        <div style={{ maxHeight: '500px', overflowY: 'auto' }} className="custom-scrollbar">
                            <div className="p-2">
                                {currentParameters.map((param, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleParameterClick(param.name)}
                                        onMouseEnter={() => setHoveredParamIndex(index)}
                                        onMouseLeave={() => setHoveredParamIndex(-1)}
                                        style={{
                                            padding: '12px 16px',
                                            backgroundColor: hoveredParamIndex === index ? '#f9fafb' : 'transparent',
                                            borderRadius: '16px',
                                            marginBottom: '8px',
                                            borderBottom: '1px solid #f3f4f6',
                                            transition: 'colors 0.15s',
                                            cursor: 'pointer'
                                        }}
                                        className="last:border-b-0 last:mb-0"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex-1">
                                                <code style={{ color: '#2563eb', fontSize: '14px', fontWeight: 500, display: 'block' }} className="font-mono">
                                                    {param.name}
                                                </code>
                                                {param.description && (
                                                    <p style={{ color: '#4b5563', fontSize: '12px', marginTop: '6px', lineHeight: '1.5' }}>
                                                        {param.description}
                                                    </p>
                                                )}
                                            </div>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                color: hoveredParamIndex === index ? '#2563eb' : '#9ca3af',
                                                transition: 'colors 0.15s',
                                                fontSize: '12px',
                                                marginTop: '2px',
                                                whiteSpace: 'nowrap'
                                            }}>
                                                <svg style={{ width: '14px', height: '14px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

            {/* Helper Text moved above - no bottom helper here anymore */}
        </div>
    );
}
