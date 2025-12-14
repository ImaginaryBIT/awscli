# AWS CLI Command Search

> **Fast, interactive search tool for AWS CLI commands with intelligent fuzzy matching and comprehensive parameter documentation.**

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## 🚀 Features

- **⚡ Instant Search**: Lightning-fast fuzzy search across 80+ AWS services and 740+ commands
- **🎯 Smart Autocomplete**: Intelligent suggestions with typo tolerance
- **📚 Comprehensive Coverage**: 3,200+ parameters with detailed descriptions
- **⌨️ Keyboard Navigation**: Full keyboard support for power users
- **🎨 Beautiful UI**: Modern, responsive design with smooth animations
- **🔍 Fuzzy Matching**: Find commands even with typos (e.g., "lamda" finds "lambda")
- **📋 Parameter Explorer**: View all parameters and descriptions for each command
- **🌐 Service Discovery**: Type "aws" to browse all available services

## 📊 Coverage

- **80 AWS Services** including EC2, S3, Lambda, DynamoDB, IAM, and more
- **742 Commands** with accurate, verified command names
- **3,207 Parameters** extracted from official AWS CLI documentation

## 🎯 Use Cases

Perfect for:
- **DevOps Engineers** quickly finding the right AWS CLI command
- **Cloud Architects** exploring AWS service capabilities
- **Developers** learning AWS CLI syntax and parameters
- **SysAdmins** managing AWS infrastructure via command line
- **Students** studying for AWS certifications

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Search**: [Fuse.js](https://fusejs.io/) for fuzzy matching
- **Data Source**: AWS CLI official documentation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/aws-cli-search.git
cd aws-cli-search

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## 💡 Usage

### Basic Search

1. **Search by service**: Type `ec2` to see all EC2 commands
2. **Search by command**: Type `ec2 describe-instances` to see specific command
3. **Browse services**: Type `aws` to see all available AWS services
4. **Fuzzy search**: Type `lamda` (typo) and it will find `lambda` commands

### Keyboard Shortcuts

- **↑/↓**: Navigate through suggestions
- **Enter**: Select command
- **Esc**: Clear search
- **Tab**: Autocomplete

### Example Searches

```
ec2                          → Shows all EC2 commands
s3 ls                        → Shows S3 list commands
lambda create                → Shows Lambda create commands
dynamodb put-item            → Shows DynamoDB put-item with parameters
```

## 📁 Project Structure

```
aws-cli-search/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with SEO metadata
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   └── SearchBar.tsx      # Main search component
├── lib/                   # Core logic
│   ├── aws-commands.ts    # AWS CLI data (3,207 parameters)
│   └── aws-search.ts      # Fuse.js search implementation
├── scripts/               # Data extraction scripts
│   ├── verify-commands.py      # Command verification
│   ├── extract-parameters.py   # Parameter extraction
│   └── merge-parameters.js     # Data merging
└── public/                # Static assets
```

## 🔧 Development Scripts

### Data Extraction (Optional)

If you want to update the AWS CLI data:

```bash
# Set up Python virtual environment
python3 -m venv .dev-data/venv
source .dev-data/venv/bin/activate
pip install boto3

# Extract parameters from AWS CLI
python3 scripts/extract-parameters.py

# Merge with existing data
node scripts/merge-parameters.js
```

## 🎨 Customization

### Adding More Services

1. Edit `lib/aws-commands.ts`
2. Add service data following the existing structure:

```typescript
{
  name: "service-name",
  description: "Service description",
  commands: [
    {
      name: "command-name",
      description: "Command description",
      parameters: [
        { name: "--param <value>", description: "Parameter description" }
      ]
    }
  ]
}
```

### Adjusting Search Sensitivity

Edit `lib/aws-search.ts` to modify Fuse.js configuration:

```typescript
const fuse = new Fuse(searchableCommands, {
  threshold: 0.3,  // Lower = stricter matching (0.0 - 1.0)
  distance: 50,    // Maximum distance for fuzzy matching
  // ... other options
});
```

## 📈 Performance

- **Initial Load**: < 1s
- **Search Response**: < 50ms
- **Bundle Size**: ~200KB (gzipped)
- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- AWS CLI documentation for command and parameter data
- [Fuse.js](https://fusejs.io/) for fuzzy search functionality
- [Next.js](https://nextjs.org/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

## 📧 Contact

Project Link: [https://github.com/yourusername/aws-cli-search](https://github.com/yourusername/aws-cli-search)

---

**⭐ If you find this tool helpful, please consider giving it a star on GitHub!**

## 🔍 SEO Keywords

AWS CLI search, AWS command search tool, AWS CLI reference, AWS CLI commands, AWS CLI parameters, AWS CLI autocomplete, AWS command line interface, AWS CLI documentation, AWS CLI helper, EC2 commands, S3 commands, Lambda commands, DynamoDB commands, AWS service commands, AWS CLI fuzzy search, AWS parameter reference, AWS CLI cheat sheet, AWS CLI tool, interactive AWS CLI, AWS CLI explorer
