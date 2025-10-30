# ainsley.dev - Project Documentation

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
npm install

# Local development server
npm run serve
# or
vercel dev

# Hugo server only (no reload)
npm run serve-no-reload
```

### Building

```bash
# Development build
npm run build

# Staging build (minified)
npm run build:staging

# Production build (minified + optimized images)
npm run build:prod

# Test build with API server
npm run build:test
```

### Testing

```bash
# Run Go tests
make test

# Run with coverage
make test-coverage

# Run linting
make lint          # All
make lint-go       # Go only
make lint-ts       # TypeScript only
```

### Code Quality

Pre-commit hooks automatically run:
- Prettier formatting (TypeScript, SCSS, JavaScript)
- ESLint (TypeScript)
- gofmt (Go)

Manual commands:
```bash
npm run clean      # Format with Prettier
npm run lint       # Lint SCSS and JS
npm run lint:scss  # Lint SCSS only
npm run lint:js    # Lint/fix TypeScript
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
make deploy        # Deploy to Vercel
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

- **package.json** - Node.js dependencies and scripts
- **go.mod** - Go module dependencies
- **tsconfig.json** - TypeScript configuration
- **vercel.json** - Vercel deployment configuration
- **Makefile** - Build automation commands
- **.golangci.yaml** - Go linting rules

## Makefile Commands

```bash
make setup         # Install dependencies
make serve         # Run development server
make build         # Build the project
make test          # Run tests
make test-coverage # Run tests with coverage
make lint          # Run all linters
make lint-go       # Lint Go code
make lint-ts       # Lint TypeScript
make format        # Format all code
make sdk           # Generate API SDK
make deploy        # Deploy to Vercel
make clean         # Clean build artifacts
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
