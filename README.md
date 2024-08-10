# @sect/use-placeholder-path

A custom React hook to retrieve placeholder path in Next.js App Router.

## Why

Next.js 13+ App Router does NOT have a method to return the path of placeholder value like `useRouter().pathname` in Pages Router.  
This hook allows you to get the path of a placeholder value, such as `useRouter().pathname` in Pages Router, on the Next.js App Router.

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

## Examples

1. For a route like `/users/123/posts/456` with params `{ userId: '123', postId: '456' }`:
   - `placeholderPath` will be `/users/[userId]/posts/[postId]`

2. For a catch-all route like `/blog/2024/08/15` with params `{ slug: ['2024', '08', '15'] }`:
   - `placeholderPath` will be `/blog/[...slug]`
