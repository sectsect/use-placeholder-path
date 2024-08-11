// src/index.ts
import { usePathname, useParams } from "next/navigation";
var getDecodedPathSegments = (pathname) => {
  return decodeURIComponent(pathname.split("?")[0]).split("/").filter(Boolean);
};
var getPlaceholder = (key, value) => {
  if (key.startsWith("__OPTIONAL_CATCH_ALL__")) {
    const segmentName = key.replace("__OPTIONAL_CATCH_ALL__", "");
    return `[[...${segmentName}]]`;
  }
  if (Array.isArray(value)) {
    return `[...${key}]`;
  }
  return `[${key}]`;
};
var replaceDynamicSegments = (segments, params) => {
  const newSegments = [...segments];
  Object.entries(params).forEach(([key, value]) => {
    const placeholder = getPlaceholder(key, value);
    const values = Array.isArray(value) ? value : [value];
    const decodedValues = values.map(decodeURIComponent);
    const startIndex = newSegments.findIndex(
      (segment) => decodedValues.includes(segment)
    );
    if (startIndex !== -1) {
      newSegments.splice(startIndex, decodedValues.length, placeholder);
    }
  });
  return newSegments;
};
var usePlaceholderPath = () => {
  const pathname = usePathname();
  const params = useParams();
  if (!pathname) return "";
  const segments = getDecodedPathSegments(pathname);
  const placeholderSegments = replaceDynamicSegments(segments, params);
  return `/${placeholderSegments.join("/")}`;
};
var src_default = usePlaceholderPath;
export {
  src_default as default
};
//# sourceMappingURL=index.js.map