import { usePathname, useParams } from 'next/navigation';

/**
 * A custom React hook to retrieve placeholder path in Next.js App Router.
 * @returns The placeholder path with dynamic segments replaced by their parameter names.
 */
const usePlaceholderPath = () => {
  const pathname = usePathname();
  const params = useParams();

  if (!pathname) return '';

  const segments = decodeURIComponent(pathname.split('?')[0])
    .split('/')
    .filter(Boolean);

  Object.entries(params).forEach(([key, value]) => {
    let placeholder: string;
    if (key.startsWith('__OPTIONAL_CATCH_ALL__')) {
      // Optional catch-all segments
      const segmentName = key.replace('__OPTIONAL_CATCH_ALL__', '');
      placeholder = `[[...${segmentName}]]`;
    } else if (Array.isArray(value)) {
      // Regular catch-all segments
      placeholder = `[...${key}]`;
    } else {
      // Regular dynamic segments
      placeholder = `[${key}]`;
    }

    const values = Array.isArray(value) ? value : [value];
    const decodedValues = values.map(decodeURIComponent);

    const startIndex = segments.findIndex(segment =>
      decodedValues.includes(segment),
    );
    if (startIndex !== -1) {
      segments.splice(startIndex, decodedValues.length, placeholder);
    }
  });

  return `/${segments.join('/')}`;
};

export default usePlaceholderPath;
