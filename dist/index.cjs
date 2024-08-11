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
var usePlaceholderPath = () => {
  const pathname = (0, import_navigation.usePathname)();
  const params = (0, import_navigation.useParams)();
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
//# sourceMappingURL=index.cjs.map