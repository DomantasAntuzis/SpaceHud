import path from 'node:path';
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import { defineConfig, includeIgnoreFile } from 'eslint/config';
import globals from 'globals';
import nodePlugin from 'eslint-plugin-n';

const gitignorePath = path.resolve(import.meta.dirname, '.gitignore');

export default defineConfig([
  includeIgnoreFile(gitignorePath),
  js.configs.recommended,
  svelte.configs.recommended,
  {	
    plugins: { n: nodePlugin }
  },
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } }
  },

  {
    files: ['**/*.svelte', '**/*.svelte.js'],
    languageOptions: { parserOptions: {} }
  },

  {
  // Override or add rule settings here, such as:
  // 'svelte/button-has-type': 'error'
    rules: {
    // --- Bug-catching ---
      'no-undef': 'error',
      'no-unused-vars': 'warn',
      'no-const-assign': 'error',
      'no-dupe-keys': 'error',
      'no-dupe-args': 'error',
      'no-unreachable': 'error',
      'no-fallthrough': 'error',
      'no-self-compare': 'error',
      'no-constant-condition': 'error',
      'valid-typeof': 'error',
      'no-unsafe-negation': 'error',

      // --- Async/Promise correctness ---
      'no-async-promise-executor': 'error',
      'require-atomic-updates': 'error',
      'require-await': 'warn',

      // --- Node-specific (from eslint-plugin-n) ---
      'n/no-missing-require': 'error',
      'n/no-extraneous-require': 'error',
      'n/no-process-exit': 'warn',
      'n/no-unpublished-require': 'off',

      // --- Consistency / footgun avoidance ---
      eqeqeq: 'error',
      indent: ['error', 2],
      camelcase: ['error', { properties: 'never' }],
      curly: 'error',
      'no-var': 'error',
      'prefer-const': 'warn',
      semi: ['error', 'always'],
    },
  }
]);
