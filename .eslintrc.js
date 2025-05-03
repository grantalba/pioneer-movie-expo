module.exports = {
  extends: ['expo', 'prettier', 'plugin:@tanstack/query/recommended'],
  overrides: [
    {
      // Test files only
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-unused-vars': ['error'],
    semi: ['error', 'always'],
    'import/order': [
      'error',
      {
        groups: [
          'builtin', // Node.js built-ins
          'external', // npm packages
          'internal', // your aliases like @/components
          ['parent', 'sibling', 'index'], // relative imports
          'object', // import x = require('module')
          'type', // Flow/TypeScript type imports
        ],
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        'newlines-between': 'always', // Add newlines between groups
        alphabetize: {
          order: 'asc', // Alphabetical order within groups
          caseInsensitive: true,
        },
      },
    ],
  },
};
