# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript React hook library `@sect/use-placeholder-path` that provides placeholder path functionality for Next.js App Router, similar to Pages Router's `router.pathname`. The hook converts dynamic routes like `/users/123/posts/456` to `/users/[userId]/posts/[postId]`.

## Core Architecture

**Main Hook Implementation**: `src/index.ts:66` - The `usePlaceholderPath` hook uses Next.js `usePathname()` and `useParams()` to reconstruct placeholder paths by:
1. Decoding and splitting pathname into segments (`decodePathSegments`)
2. Replacing dynamic segments with placeholders (`replaceDynamicSegments`) 
3. Handling special cases like optional catch-all segments

**Key Functions**:
- `getPlaceholder()` - Generates placeholder strings for dynamic segments, handles `__OPTIONAL_CATCH_ALL__` prefixed keys
- `replaceDynamicSegments()` - Core logic that matches parameter values to path segments and replaces them
- Special handling for top-level optional catch-all segments when `optionalCatchAllSegments` option is provided

## Development Commands

```bash
# Build the library
npm run build

# Linting and type checking
npm run lint
npm run lint:fix
npm run type-check
npm run type-check:watch

# Testing
npm test                    # Run all tests
npm run test:watch         # Watch mode
npm run test:coverage      # Generate coverage report

# Release workflow
npm run changeset          # Create changeset
npm run release           # Build and publish
```

## Testing Architecture

- **Framework**: Vitest with jsdom environment
- **Location**: `src/__tests__/index.test.ts` 
- **Setup**: `vitest.setup.ts` configures React Testing Library and mocks browser APIs
- **Mocking**: Next.js navigation hooks (`usePathname`, `useParams`) are mocked via `vi.mock('next/navigation')`
- **Coverage**: Configured for `src/**/*.ts` files with v8 provider

## Build Configuration

- **Library Builder**: tsup (`tsup.config.ts`) - outputs CJS/ESM formats with TypeScript declarations
- **Development**: Vite (`vite.config.ts`) with React plugin for testing environment
- **TypeScript**: Strict mode enabled, Next.js plugin configured

## Code Quality

- **ESLint Config**: Flat config format (`eslint.config.mjs`) with Airbnb TypeScript rules
- **Key Rules**: Unused imports removal, consistent type imports, no explicit any
- **Testing Rules**: Consistent test naming (`test` not `it`), required top-level describe blocks
- **Prettier**: Integrated with ESLint for formatting

## Publishing

- Uses Changesets for version management and automated releases
- Builds to `dist/` with multiple formats (CJS, ESM, TypeScript declarations)
- Published as `@sect/use-placeholder-path` with public access