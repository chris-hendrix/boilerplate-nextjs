module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'next/core-web-vitals',
    'plugin:react/recommended',
    'airbnb-base',
    'airbnb-typescript',
  ],
  ignorePatterns: ['**/*.js', 'node_modules/*'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: "./tsconfig.json"
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    '@typescript-eslint/comma-dangle': 'off',
    '@typescript-eslint/semi': ['error', 'never'],
    'no-trailing-spaces': 'error',
    'object-curly-newline': 'off',
    'react/react-in-jsx-scope': 'off',
  }
};
