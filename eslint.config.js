// eslint.config.js
import nextPlugin from "@next/eslint-plugin-next";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
        {
                ignores: ["node_modules/**", ".next/**", "app/generated/**", "dist/**", "build/**"],
        },
        {
                files: ["**/*.{js,ts,jsx,tsx}"],
                languageOptions: {
                        parser: tsParser,
                        parserOptions: {
                                ecmaVersion: "latest",
                                sourceType: "module",
                                // ❌ bỏ project để tránh lỗi tsconfig không bao gồm file
                        },
                },
                plugins: {
                        "@typescript-eslint": ts,
                        "@next/next": nextPlugin,
                },
                rules: {
                        "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
                        "@typescript-eslint/no-unused-expressions": "warn",
                        "@typescript-eslint/no-require-imports": "error",
                },
        },
];
