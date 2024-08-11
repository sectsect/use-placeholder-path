// src/index.ts
import { usePathname, useParams } from "next/navigation";
var usePlaceholderPath = () => {
  const pathname = usePathname();
  const params = useParams();
  if (!pathname) return "";
  const segments = decodeURIComponent(pathname.split("?")[0]).split("/").filter(Boolean);
  Object.entries(params).forEach(([key, value]) => {
    const placeholder = Array.isArray(value) ? `[...${key}]` : `[${key}]`;
    const values = Array.isArray(value) ? value : [value];
    const decodedValues = values.map(decodeURIComponent);
    const startIndex = segments.findIndex(
      (segment) => decodedValues.includes(segment)
    );
    if (startIndex !== -1) {
      segments.splice(startIndex, decodedValues.length, placeholder);
    }
  });
  return `/${segments.join("/")}`;
};
var src_default = usePlaceholderPath;
export {
  src_default as default
};
//# sourceMappingURL=index.js.map