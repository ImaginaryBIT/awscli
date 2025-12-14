# Data Extraction Scripts

This directory contains scripts for extracting and processing AWS CLI command data.

## Scripts

### verify-commands.py
Verifies command accuracy against AWS CLI using boto3.
- Compares our data with actual AWS CLI
- Identifies invalid commands and duplicates
- Generates verification report

**Usage:**
```bash
source .dev-data/venv/bin/activate
python3 scripts/verify-commands.py
```

### extract-parameters.py
Extracts parameters from AWS CLI help output.
- Parses AWS CLI help text
- Extracts parameter names, types, and descriptions
- Handles terminal formatting characters

**Usage:**
```bash
source .dev-data/venv/bin/activate
python3 scripts/extract-parameters.py --test  # Test mode
python3 scripts/extract-parameters.py         # Full extraction
```

### clean-commands.py
Fixes command format issues and removes duplicates.
- Converts underscore to hyphen format
- Removes duplicate commands
- Generates cleaned data file

**Usage:**
```bash
source .dev-data/venv/bin/activate
python3 scripts/clean-commands.py
```

### merge-parameters.js
Merges extracted parameters with existing command data.
- Preserves existing high-quality parameters
- Adds newly extracted parameters
- Generates final TypeScript file

**Usage:**
```bash
node scripts/merge-parameters.js
```

## Requirements

- Python 3.8+
- boto3 (for AWS SDK access)
- Node.js 18+ (for merge script)

## Setup

```bash
# Create virtual environment
python3 -m venv .dev-data/venv

# Activate virtual environment
source .dev-data/venv/bin/activate

# Install dependencies
pip install boto3
```
