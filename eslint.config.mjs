import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      'eslint:recommended',
      'next',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/strict',
      'plugin:prettier/recommended',
    ],
  }),
  {
    ignores: ['**/*.test.tsx', '**/*.test.ts'],
  },
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      prettier: prettierPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      'prettier/prettier': 'error',
    },
  },
];

export default eslintConfig;
