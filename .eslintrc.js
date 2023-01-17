module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'airbnb-base',
    'airbnb-typescript',
  ],
  ignorePatterns: [
    '**/*.js',
    'node_modules/*'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    '@typescript-eslint/comma-dangle': 'off', // allows no comma dangle
    '@typescript-eslint/semi': ['error', 'never'], // forces no semicolon
    '@typescript-eslint/no-unused-expressions': 'off', // allows true && runFunction()
    '@typescript-eslint/no-unused-vars': [ // allows unused vars with explicit underscore
      'error',
      { 'argsIgnorePattern': '^_', 'varsIgnorePattern': '^_', 'caughtErrorsIgnorePattern': '^_' },
    ],
    'jsx-quotes': ['error', 'prefer-double'], // force double quotes for jsx props
    'object-curly-newline': 'off', // allows objects on one line
    'react/prop-types': 'off', // no need for propTypes in typescript
    'react/react-in-jsx-scope': 'off', // no need to import React in jsx files
  }
};
