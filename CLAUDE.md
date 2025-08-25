# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript React hook library `@sect/use-placeholder-path` that provides placeholder path functionality for Next.js App Router, similar to Pages Router's `router.pathname`. The hook converts dynamic routes like `/users/123/posts/456` to `/users/[userId]/posts/[postId]`.

**Requirements**: Client-side only (requires `'use client'` directive) with peer dependencies Next.js 13-15 and React 18-19.

## Core Architecture

**Main Hook Implementation**: `src/index.ts:66` - The `usePlaceholderPath` hook uses Next.js `usePathname()` and `useParams()` to reconstruct placeholder paths by:
1. Decoding and splitting pathname into segments (`decodePathSegments`)
2. Replacing dynamic segments with placeholders (`replaceDynamicSegments`) 
3. Handling special cases like optional catch-all segments

**Key Functions**:
- `decodePathSegments()` - Decodes URL-encoded characters and splits pathname (handles international characters)
- `getPlaceholder()` - Generates placeholder strings for dynamic segments, handles `__OPTIONAL_CATCH_ALL__` prefixed keys
- `replaceDynamicSegments()` - Core logic that matches parameter values to path segments and replaces them
- Special handling for top-level optional catch-all segments when `optionalCatchAllSegments` option is provided

**Algorithm Details**:
- Processes parameters by finding matching segments and replacing them with placeholders
- Handles catch-all routes (`[...slug]`) and optional catch-all routes (`[[...slug]]`)
- Special case: Top-level optional catch-all detection requires explicit configuration due to Next.js limitations
- URL decoding ensures proper handling of encoded characters in paths

**API Interface**:
```typescript
interface UsePlaceholderPathOptions {
  optionalCatchAllSegments?: string;
}
```

## Development Commands

```bash
# Build the library
npm run build

# Linting and type checking
npm run lint                # Lint all TypeScript files
npm run lint:fix           # Auto-fix linting issues
npm run type-check         # TypeScript compilation check
npm run type-check:watch   # Watch mode for type checking

# Testing
npm test                   # Run all tests once
npm run test:watch        # Watch mode for development
npm run test:coverage     # Generate coverage report
vitest run --reporter=verbose  # Run tests with detailed output

# Release workflow
npm run changeset         # Create changeset for version bump
npm run release          # Build and publish to npm
npm run prepare          # Setup husky git hooks
```

## Testing Architecture

- **Framework**: Vitest with jsdom environment and React Testing Library
- **Location**: `src/__tests__/index.test.ts` - comprehensive test coverage for all scenarios
- **Setup**: `vitest.setup.ts` configures React Testing Library, mocks browser APIs (matchMedia, intersection-observer)
- **Mocking**: Next.js navigation hooks (`usePathname`, `useParams`) are mocked via `vi.mock('next/navigation')`
- **Coverage**: Configured for `src/**/*.ts` files with v8 provider, outputs text/json/html/lcov reports
- **Test Cases**: Covers dynamic segments, catch-all routes, optional catch-all routes, URL encoding, and edge cases

## Build Configuration

- **Library Builder**: tsup (`tsup.config.ts`) - dual format output (CJS/ESM) with TypeScript declarations, sourcemaps, and tree-shaking
- **Development**: Vite (`vite.config.ts`) with React plugin, TypeScript paths, and magical SVG plugin for testing environment
- **Dual System**: tsup for production library builds, Vite for development and testing
- **Output**: `dist/` directory with `index.js` (CJS), `index.mjs` (ESM), and `index.d.ts` (types)

## Code Quality

- **ESLint Config**: Modern flat config format (`eslint.config.mjs`) with comprehensive rule set:
  - Airbnb TypeScript base configuration
  - React, React Hooks, and JSX a11y rules
  - TypeScript strict rules (no explicit any, consistent type imports)
  - Import organization and unused import removal
  - Testing-specific rules for Vitest
  - TSDoc documentation validation
- **Git Hooks**: Husky with commitlint for conventional commits
- **Prettier**: Integrated with ESLint for consistent code formatting
- **Testing Standards**: 
  - Use `test` not `it` for test naming
  - Require top-level describe blocks (max 2)
  - Comprehensive test coverage for all code paths

## Publishing

- **Version Management**: Changesets for semantic versioning and automated releases
- **Distribution**: Published as `@sect/use-placeholder-path` on npm with public access
- **Formats**: Multiple build outputs (CJS, ESM, TypeScript declarations) for maximum compatibility
- **CI/CD**: Automated releases via GitHub Actions with comprehensive testing and code quality checks