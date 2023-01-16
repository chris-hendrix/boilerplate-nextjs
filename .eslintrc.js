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
    project: "./tsconfig.json"
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    '@typescript-eslint/comma-dangle': 'off', // allows no comma dangle
    '@typescript-eslint/semi': ['error', 'never'], // forces no semicolon
    '@typescript-eslint/no-unused-expressions': 'off', // allows true && runFunction()
    'jsx-quotes': ['error', 'prefer-double'], // force double quotes for jsx props
    // 'no-trailing-spaces': 'error',
    'object-curly-newline': 'off', // allows objects on one line
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
  }
};
