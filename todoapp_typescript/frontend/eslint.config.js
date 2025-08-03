// eslint.config.js
import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";

export default defineConfig([
  // Base config for JavaScript and TypeScript React files
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        ...globals.es2021
      }
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      "jsx-a11y": pluginJsxA11y
    },
    settings: {
      react: {
        version: "detect"
      }
    },
    rules: {
      // Base JS rules
      ...js.configs.recommended.rules,

      // TypeScript ESLint recommended rules
      ...tseslint.configs.recommended.rules,
      ...tseslint.configs["recommended-type-checked"].rules,

      // React & hooks rules
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,

      // Accessibility rules
      ...pluginJsxA11y.configs.recommended.rules,

      // Optional project-specific rules
      "react/react-in-jsx-scope": "off", // Not needed in React 17+
      "@typescript-eslint/no-unused-vars": ["warn"],
      "no-console": "warn",
      "quotes": ["error", "double"], // this enforces double quotes
  
    }
  }
]);
