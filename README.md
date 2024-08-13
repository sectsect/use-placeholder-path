# @sect/use-placeholder-path

[![Release](https://github.com/sectsect/use-placeholder-path/actions/workflows/release.yml/badge.svg)](https://github.com/sectsect/use-placeholder-path/actions/workflows/release.yml) [![codecov](https://codecov.io/gh/sectsect/use-placeholder-path/graph/badge.svg?token=WsgZ81CmzZ)](https://codecov.io/gh/sectsect/use-placeholder-path) [![CodeQL](https://github.com/sectsect/use-placeholder-path/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/sectsect/use-placeholder-path/actions/workflows/github-code-scanning/codeql) [![npm version](https://badge.fury.io/js/@sect%2Fuse-placeholder-path.svg)](https://badge.fury.io/js/@sect%2Fuse-placeholder-path) ![NPM](https://img.shields.io/npm/l/@sect/use-placeholder-path)

A custom React hook to retrieve placeholder paths in Next.js App Router.

## Why Use This Hook?

Next.js 13+ App Router doesn't provide a built-in method to return the path of placeholder values, unlike `router.pathname` in Pages Router. This hook fills that gap, allowing you to get the placeholder path in the App Router, similar to how you would in the Pages Router.

### Easing the Transition from Pages Router

For developers migrating from Pages Router to App Router, this hook can significantly reduce the pain points associated with the transition. It provides a familiar way to access placeholder paths, making it easier to port existing code and maintain consistency in your application's routing logic. By offering functionality similar to `router.pathname`, `usePlaceholderPath` helps bridge the gap between the two routing systems, allowing for a smoother migration process and reducing the need for extensive refactoring of route-dependent code.

## Installation

```bash
npm install @sect/use-placeholder-path
# or
yarn add @sect/use-placeholder-path
# or
pnpm add @sect/use-placeholder-path
```

## Usage

```typescript
'use client';

import usePlaceholderPath from '@sect/use-placeholder-path';

const MyComponent = () => {
  const placeholderPath = usePlaceholderPath();
  
  return (
    <div>
      <p>Current placeholder path: {placeholderPath}</p>
    </div>
  );
}

export default MyComponent;
```

## API

```typescript
usePlaceholderPath(options?: UsePlaceholderPathOptions): string

interface UsePlaceholderPathOptions {
  optionalCatchAllSegments?: string;
}
```

- `optionalCatchAllSegments`: (optional) The name of the optional catch-all segment. If provided, enables handling of top-level optional catch-all segments.

## Examples

1. Route: `/users/123/posts/456`
  - Result: `/users/[userId]/posts/[postId]`

2. Catch-all route: `/blog/2024/08/15`
  - Result: `/blog/[...slug]`

## Notes

- `usePlaceholderPath` requires the use of a [Client Component](https://nextjs.org/docs/app/building-your-application/rendering/client-components).

## Known Issues

### Detecting Top-Level Optional Catch-all Segments

Top-Level Optional Catch-all Segments are expected to return `/folderName/[[...segmentName]]`, but currently `/folderName` is returned.

- Expected: `/shop/[[...slug]]`
- Actual: `/shop`

This is due to the technical limitations in detecting Top-Level Optional Catch-all Segments in the Next.js App Router.

To address this limitation, we've introduced an optional configuration:

```typescript
const placeholderPath = usePlaceholderPath({
  optionalCatchAllSegments: 'slug'
});
```

## Changelog 

See [CHANGELOG](https://github.com/sectsect/use-placeholder-path/blob/main/CHANGELOG.md).

<p align="center">✌️</p>
<p align="center">
<sub><sup>A little project by <a href="https://github.com/sectsect">@sectsect</a></sup></sub>
</p>
