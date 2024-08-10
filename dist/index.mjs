// src/index.ts
import { usePathname, useParams } from "next/navigation";
var usePlaceholderPath = () => {
  const pathname = usePathname();
  const params = useParams();
  if (!pathname) {
    return "";
  }
  const decodedPathname = decodeURIComponent(pathname);
  const segments = decodedPathname.split("/").filter(Boolean);
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      const placeholder = `[...${key}]`;
      const decodedValues = value.map(decodeURIComponent);
      const startIndex = segments.findIndex(
        (segment) => segment === decodedValues[0]
      );
      if (startIndex !== -1) {
        segments.splice(startIndex, decodedValues.length, placeholder);
      }
    } else if (typeof value === "string") {
      const decodedValue = decodeURIComponent(value);
      const replaceIndex = segments.findIndex(
        (segment) => segment === decodedValue
      );
      if (replaceIndex !== -1) {
        segments[replaceIndex] = `[${key}]`;
      }
    }
  });
  return `/${segments.join("/")}`;
};
var src_default = usePlaceholderPath;
export {
  src_default as default
};
//# sourceMappingURL=index.mjs.map