module.exports = {
  env: {
    // If environment not given then lint error will come for document, window etc.
    browser: true,
    es2021: true,
    node: true,
  },
  globals: {
    VoidFunction: true,
    JSX: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'react', 'eslint-plugin-import'],
  extends: [
    // The order of below elements is significant, if it is not proper then will not show proper errors
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'eslint:recommended',

    'plugin:prettier/recommended',
  ],
  settings: {
    'import/resolver': {
      typescript: {},
      // node: {
      //   extensions: ['.js', '.jsx', '.ts', '.tsx'],
      // },
    },
    react: {
      version: 'detect',
    },
  },
  rules: {
    'prettier/prettier': ['error'],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/react-in-tsx-scope': 'off',
    'react/jsx-no-target-blank': 'off',
    'no-unused-vars': ['warn'],
    'no-undef': 'error',
    'no-empty': 'warn',
    'no-unsafe-optional-chaining': 'warn',
    'no-useless-escape': 'warn',
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
  },
  ignorePatterns: ['node_modules/'],

  overrides: [
    {
      files: ['src/**/*.{js,jsx,mjs,cjs,ts,tsx}'],
      // excludedFiles: ['*.test.js', '*.test.jsx', '*.test.ts', '*.test.tsx'],
      rules: {
        // add your rules here
      },
    },
  ],
};

