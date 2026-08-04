import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// eslint-config-next@16 ships native ESLint 9 flat config exports
// ("eslint-config-next/core-web-vitals", "eslint-config-next/typescript").
// These are imported directly here rather than through @eslint/eslintrc's
// FlatCompat("next/core-web-vitals", ...) shim, which wraps them as
// legacy-style shareable configs and re-validates the result with
// @eslint/eslintrc's schema validator. That validator tries to
// JSON.stringify the resolved plugin objects when reporting certain
// errors, and eslint-plugin-react's flat config contains a self-reference
// (plugins.react points back to the plugin object itself), which crashes
// with "TypeError: Converting circular structure to JSON" instead of a
// normal lint result. Importing the native flat config exports avoids
// FlatCompat entirely, so this problem doesn't come up.
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    "node_modules/**",
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
