// import js from '@eslint/js'
// import globals from 'globals'
// import reactHooks from 'eslint-plugin-react-hooks'
// import reactRefresh from 'eslint-plugin-react-refresh'

// export default [
//   { ignores: ['dist'] },
//   {
//     files: ['**/*.{js,jsx}'],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//       parserOptions: {
//         ecmaVersion: 'latest',
//         ecmaFeatures: { jsx: true },
//         sourceType: 'module',
//       },
//     },
//     plugins: {
//       'react-hooks': reactHooks,
//       'react-refresh': reactRefresh,
//     },
//     rules: {
//       ...js.configs.recommended.rules,
//       ...reactHooks.configs.recommended.rules,
//       'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
//       'react-refresh/only-export-components': [
//         'warn',
//         { allowConstantExport: true },
//       ],
//     },
//   },
// ]
// eslint.config.js
import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import eslintFormatting from "eslint-config-eslint/formatting";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";

export default defineConfig([
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            parserOptions: {
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

            // ESLint formatting style
            ...eslintFormatting.rules,

            // Base JS recommendations
            ...js.configs.recommended.rules,

            // React plugin rules
            ...pluginReact.configs.flat.recommended.rules,

            // React Hooks rules
            ...pluginReactHooks.configs.recommended.rules,

            // Accessibility rules for JSX
            ...pluginJsxA11y.configs.recommended.rules,

            // You can override or add custom rules here
            "react/react-in-jsx-scope": "off", // for React 17+
            "no-console": "warn",
            semi: ["error", "always"],
            quotes: ["error", "double"]
        }
    }
]);
