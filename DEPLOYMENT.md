# Deployment Guide

## Prerequisites

- Node.js 18+
- npm or yarn

## Environment Setup

No environment variables required for basic deployment.

## Build

```bash
npm install
npm run build
```

## Deployment Options

### Option 1: Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/aws-cli-search)

### Option 2: Netlify

1. Push to GitHub
2. Connect repository in Netlify
3. Build command: `npm run build`
4. Publish directory: `.next`

### Option 3: Self-Hosted

```bash
# Build
npm run build

# Start production server
npm start
```

Server will run on port 3000 by default.

### Option 4: Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

## SEO Configuration

Update the following files with your domain:

1. **public/robots.txt** - Replace `yourdomain.com` with your domain
2. **public/sitemap.xml** - Replace `yourdomain.com` with your domain
3. **README.md** - Update GitHub repository URL

## Performance Optimization

- Static pages are pre-rendered at build time
- Fuzzy search runs client-side for instant results
- No external API calls required
- Bundle size: ~200KB gzipped

## Monitoring

Recommended tools:
- Google Analytics for usage tracking
- Vercel Analytics for performance monitoring
- Google Search Console for SEO monitoring
