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
declare const usePlaceholderPath: () => string;

export { usePlaceholderPath as default };
