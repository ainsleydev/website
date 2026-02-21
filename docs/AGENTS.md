# ainsley.dev - Project Documentation

> **Note**: This file is the source for project-specific documentation. It is combined with developer
> guidelines from `content/guidelines/` to generate the root `AGENTS.md` file. To regenerate the
> combined documentation, run `pnpm agents`.

## Project Overview

ainsley.dev is a professional portfolio and agency website showcasing digital craftmanship. The site combines Hugo's static site generation with a Go backend API, creating a fast, modern web experience.

**Live URL**: https://ainsley.dev
**Staging URL**: https://staging.ainsley.dev

## Technology Stack

### Frontend
- **Hugo** v0.112.1 - Static site generator for content management
- **TypeScript** - Interactive components and animations
- **SCSS** - Styling with modern CSS practices
- **Barba.js** - Smooth page transitions
- **Anime.js** - Animation library

### Backend
- **Go** 1.24.5 - API server with Echo framework
- **OpenAPI 3.0** - API specification and documentation

### Infrastructure
- **Vercel** - Hosting and serverless deployment
- **GitHub Actions** - CI/CD pipeline
- **Husky** - Git hooks for pre-commit checks

## Directory Structure

```
/home/user/website/
├── content/           # Hugo content (markdown files)
│   ├── guidelines/   # Developer guidelines
│   ├── insights/     # Blog posts
│   ├── portfolio/    # Portfolio projects
│   ├── services/     # Service pages
│   └── about/        # About pages
├── api/              # Go API backend
│   ├── _pkg/         # API packages
│   ├── _sdk/         # Generated SDK
│   └── _mocks/       # Test mocks
├── layouts/          # Hugo templates
├── assets/           # Source files
│   ├── js/           # TypeScript files
│   ├── scss/         # Stylesheets
│   └── images/       # Images
├── config/           # Hugo configuration
│   ├── _default/     # Base config
│   ├── production/   # Production overrides
│   └── staging/      # Staging overrides
├── static/           # Static files (copied as-is)
├── bin/              # Build scripts
└── public/           # Generated output (git-ignored)
```

## Development Workflow

### Setup

```bash
# Install dependencies
pnpm install

# Local development server (runs both sites simultaneously with colors)
# - ainsley-dev on http://localhost:3000
# - ainsley-clark on http://localhost:3001
pnpm dev

# Single site development
pnpm dev:ainsley-dev   # ainsley-dev only
pnpm dev:ainsley-clark # ainsley-clark only

# Or use Vercel dev server
vercel dev
```

### Building

```bash
# Development build (both sites)
pnpm build

# Development build (single site)
pnpm build:ainsley-dev
pnpm build:ainsley-clark

# Staging build (both sites, minified)
pnpm build:staging

# Production build (both sites, minified)
pnpm build:prod
```

### Testing

```bash
# Run Go tests
pnpm test

# Run with coverage
pnpm cover

# Run linting
pnpm lint          # All
pnpm lint:go       # Go only
pnpm lint:js       # JavaScript/TypeScript only
pnpm lint:scss     # SCSS only
```

### Code Quality

Pre-commit hooks automatically run:
- Prettier formatting (TypeScript, SCSS, JavaScript)
- ESLint (TypeScript)
- gofmt (Go)

Manual commands:
```bash
pnpm format        # Format all code
pnpm format:go     # Format Go
pnpm format:js     # Format JS/TS/SCSS
pnpm lint          # Lint all
pnpm lint:scss     # Lint SCSS
pnpm lint:js       # Lint JavaScript/TypeScript
pnpm lint:go       # Lint Go
pnpm clean         # Clean build artifacts
```

## API Structure

The Go API is located in `/api/_pkg/` and provides:

### Endpoints
- `GET /ping/` - Health check
- `POST /forms/contact/` - Contact form submission (sends to Slack + Email)
- `GET /credentials/` - Retrieve credentials

### Key Components
- **Echo Framework** - HTTP routing and middleware
- **OpenAPI Spec** - API documentation in `/openapi/`
- **Middleware** - Logger, analytics, error handling
- **Gateways** - Slack and email integrations
- **Testing** - Unit and integration tests

## Deployment

### Automatic Deployment
- **Main branch** → Production (ainsley.dev)
- **Staging branch** → Staging (staging.ainsley.dev)
- Handled automatically by Vercel on git push

### Manual Deploy
```bash
pnpm deploy:prod       # Deploy to production
pnpm deploy:staging    # Deploy to staging
```

### Environment Configuration
- Development: `.env.example` template
- Staging: `config/staging/`
- Production: `config/production/`

## Content Management

### Creating Content

```bash
# New blog post
hugo new --kind post-bundle insights/my-post

# New portfolio item
hugo new --kind portfolio-bundle portfolio/client-name
```

### Content Types
- **Insights** - Blog posts and articles
- **Portfolio** - Client project showcases
- **Services** - Service offering pages
- **Guidelines** - Developer documentation
- **Brand** - Brand guidelines and assets

## Build Scripts

Located in `/bin/`:
- `image-optim.sh` - Optimize images for production
- `video-optim.sh` - Optimize videos

## Configuration Files

- **package.json** - Node.js dependencies and scripts (pnpm workspaces)
- **go.mod** - Go module dependencies
- **tsconfig.json** - TypeScript configuration
- **vercel.json** - Vercel deployment configuration
- **.golangci.yaml** - Go linting rules

## pnpm Scripts

```bash
pnpm setup                    # Install dependencies and setup
pnpm setup:vercel             # Setup for Vercel deployment
pnpm dev                      # Run both Hugo servers (ports 3000 & 3001)
pnpm dev:ainsley-dev          # Run ainsley-dev only
pnpm dev:ainsley-clark        # Run ainsley-clark only
pnpm build                    # Build both sites
pnpm build:ainsley-dev        # Build ainsley-dev only
pnpm build:ainsley-clark      # Build ainsley-clark only
pnpm build:staging            # Build staging (both sites)
pnpm build:staging:ainsley-dev # Build staging (ainsley-dev only)
pnpm build:staging:ainsley-clark # Build staging (ainsley-clark only)
pnpm build:prod               # Build production (both sites)
pnpm build:prod:ainsley-dev   # Build production (ainsley-dev only)
pnpm build:prod:ainsley-clark # Build production (ainsley-clark only)
pnpm test                     # Run Go tests
pnpm cover                    # Run tests with coverage report
pnpm lint                     # Run all linters (Go, JS, SCSS)
pnpm lint:go                  # Lint Go code
pnpm lint:js                  # Lint JavaScript/TypeScript
pnpm lint:scss                # Lint SCSS
pnpm format                   # Format all code (Go, JS, TS, SCSS)
pnpm format:go                # Format Go code
pnpm format:js                # Format JavaScript/TypeScript/SCSS
pnpm sdk                      # Generate Go & TypeScript API SDKs
pnpm deploy:prod              # Deploy to production
pnpm deploy:staging           # Deploy to staging
pnpm clean                    # Clean build artifacts
pnpm mock                     # Generate mocks
pnpm image                    # Optimize images
pnpm video                    # Optimize videos
pnpm agents                   # Generate agents markdown
pnpm todo                     # Show TODO items
pnpm precommit                # Run pre-commit checks
```

## Git Workflow

- **Main branch** - Production-ready code
- **Staging branch** - Pre-production testing
- **Feature branches** - Named `claude/*` or `feature/*`

### Branch Protection
- Push to `claude/*` branches must match session ID
- Use `git push -u origin <branch-name>` for new branches

## British English

All content, comments, and documentation use British English spellings:
- colour (not color)
- centre (not center)
- optimise (not optimize)
- behaviour (not behavior)

## Licence

Code Copyright 2023 ainsley.dev. Code released under the BSD-3 Clause licence.
