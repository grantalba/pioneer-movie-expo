module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
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
