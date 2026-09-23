import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      /*
        Base no-unused-vars cannot see JSX usage, so `motion` (used only as
        <motion.div>) was reported as unused in 14 files, and `Icon` — pulled
        out of props, so an arg rather than a var — fell outside
        varsIgnorePattern. Between them, 22 false positives were burying two
        genuine errors. eslint-plugin-react's jsx-uses-vars is the principled
        fix; these patterns avoid the extra dependency.
      */
      'no-unused-vars': ['error', {
        varsIgnorePattern: '^([A-Z_]|motion$)',
        argsIgnorePattern: '^([A-Z_]|_)',
      }],
    },
  },
])
