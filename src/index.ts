import { usePathname, useParams } from 'next/navigation';

interface UsePlaceholderPathOptions {
  optionalCatchAllSegments?: string;
}

/**
 * Decodes and splits a pathname into segments.
 * @param pathname - The URL pathname to decode and split.
 * @returns An array of decoded path segments, excluding empty segments.
 */
const decodePathSegments = (pathname: string): string[] =>
  decodeURIComponent(pathname.split('?')[0]).split('/').filter(Boolean);

/**
 * Generates a placeholder string for dynamic route segments.
 * @param key - The parameter key.
 * @param value - The parameter value, which can be a string or an array of strings.
 * @returns A placeholder string representing the dynamic segment.
 */
const getPlaceholder = (key: string, value: string | string[]): string => {
  if (key.startsWith('__OPTIONAL_CATCH_ALL__')) {
    const segmentName = key.replace('__OPTIONAL_CATCH_ALL__', '');
    return `[[...${segmentName}]]`;
  }
  return Array.isArray(value) ? `[...${key}]` : `[${key}]`;
};

/**
 * Replaces dynamic segments in a path with their corresponding placeholders.
 * @param segments - An array of path segments.
 * @param params - An object containing dynamic route parameters.
 * @returns A new array of segments with dynamic parts replaced by placeholders.
 */
const replaceDynamicSegments = (
  segments: string[],
  params: Record<string, string | string[]>,
): string[] => {
  const newSegments = [...segments];

  Object.entries(params).forEach(([key, value]) => {
    const placeholder = getPlaceholder(key, value);
    const values = Array.isArray(value) ? value : [value];
    const decodedValues = values.map(decodeURIComponent);

    const startIndex = newSegments.findIndex(segment =>
      decodedValues.includes(segment),
    );

    if (startIndex !== -1) {
      newSegments.splice(startIndex, decodedValues.length, placeholder);
    }
  });

  return newSegments;
};

/**
 * A custom React hook to retrieve placeholder path in Next.js App Router.
 * @param options - Configuration options for the hook.
 *        optionalCatchAllSegments - The name of the optional catch-all segment. If provided, enables handling of top-level optional catch-all segments.
 * @returns The placeholder path with dynamic segments replaced by their parameter names.
 */
const usePlaceholderPath = (options: UsePlaceholderPathOptions = {}) => {
  const pathname = usePathname();
  const params = useParams();

  if (!pathname) return '';

  const segments = decodePathSegments(pathname);
  const placeholderSegments = replaceDynamicSegments(segments, params);

  const { optionalCatchAllSegments } = options;
  const isTopLevelOptionalCatchAll =
    optionalCatchAllSegments !== undefined &&
    Object.keys(params).length === 0 &&
    segments.length === 1;

  // Handle top-level optional catch-all segments
  if (isTopLevelOptionalCatchAll) {
    const catchAllSegment = optionalCatchAllSegments || 'slug'; // Use 'slug' as default if empty string
    return `/${segments[0]}/[[...${catchAllSegment}]]`;
  }

  return `/${placeholderSegments.join('/')}`;
};

export default usePlaceholderPath;
