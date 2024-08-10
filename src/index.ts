import { usePathname, useParams } from 'next/navigation';

/**
 * A custom React hook for retrieve placeholder path in Next.js App Router.
 *
 * @returns The placeholder path with dynamic segments replaced by their parameter names.
 *
 * @remarks
 * This hook supports URL-encoded characters (e.g. Japanese) in the path.
 *
 * @example
 * // For a route like '/users/123/posts/456'
 * // with params \{ userId: '123', postId: '456' \}
 * const placeholderPath = usePlaceholderPath();
 * // placeholderPath will be '/users/[userId]/posts/[postId]'
 *
 * @example
 * // For a catch-all route like '/blog/2023/03/15'
 * // with params \{ slug: ['2023', '03', '15'] \}
 * const placeholderPath = usePlaceholderPath();
 * // placeholderPath will be '/blog/[...slug]'
 */
const usePlaceholderPath = (): string => {
  const pathname = usePathname();
  const params = useParams();

  if (!pathname) {
    return '';
  }

  const decodedPathname = decodeURIComponent(pathname);
  const segments = decodedPathname.split('/').filter(Boolean);

  // Replace parameters with placeholders
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      // Handle catch-all routes
      const placeholder = `[...${key}]`;
      const decodedValues = value.map(decodeURIComponent);
      const startIndex = segments.findIndex(
        segment => segment === decodedValues[0],
      );
      if (startIndex !== -1) {
        segments.splice(startIndex, decodedValues.length, placeholder);
      }
    } else if (typeof value === 'string') {
      // Handle regular dynamic routes
      const decodedValue = decodeURIComponent(value);
      const replaceIndex = segments.findIndex(
        segment => segment === decodedValue,
      );
      if (replaceIndex !== -1) {
        segments[replaceIndex] = `[${key}]`;
      }
    }
  });

  return `/${segments.join('/')}`;
};

export default usePlaceholderPath;
