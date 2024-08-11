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
    const placeholder = Array.isArray(value) ? `[...${key}]` : `[${key}]`;
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
