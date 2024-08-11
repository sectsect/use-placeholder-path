"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);
var import_navigation = require("next/navigation");
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
  const pathname = (0, import_navigation.usePathname)();
  const params = (0, import_navigation.useParams)();
  if (!pathname) return "";
  const segments = getDecodedPathSegments(pathname);
  const placeholderSegments = replaceDynamicSegments(segments, params);
  return `/${placeholderSegments.join("/")}`;
};
var src_default = usePlaceholderPath;
//# sourceMappingURL=index.cjs.map