import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import noHardcodedColors from "./eslint-rules/no-hardcoded-colors.js";
import noRawHtmlElements from "./eslint-rules/no-raw-html-elements.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "src/scripts/**/*",
      "src/script-fix-nav.js"
    ]
  },
  {
    files: ["src/components/**/*.{ts,tsx}", "src/app/**/*.{ts,tsx}"],
    plugins: {
      "design-system": {
        rules: {
          "no-hardcoded-colors": noHardcodedColors,
          "no-raw-html-elements": noRawHtmlElements,
        },
      },
    },
    rules: {
      "design-system/no-hardcoded-colors": "warn",
      "design-system/no-raw-html-elements": "warn",
    },
  },
];

export default eslintConfig;
