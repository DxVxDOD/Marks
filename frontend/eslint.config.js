import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  (pluginReact.configs["jsx-runtime"].parserOptions.ecmaFeatures.jsx = true),
  (pluginReact.configs["jsx-runtime"].parserOptions.jsxPragma = null),
  (pluginReact.configs["jsx-runtime"].rules["react/jsx-uses-react"] = 0),
  (pluginReact.configs["jsx-runtime"].rules["react/react-in-jsx-scope"] = 0),
];
