const baseConfig = {
  root: true,
  parser: 'babel-eslint',
  extends: [
    'airbnb-typescript',
    'plugin:eslint-comments/recommended',
    'plugin:jest/recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'prettier',
    'prettier/react',
  ],
  plugins: ['eslint-comments', 'jest', 'promise', 'unicorn'],
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['.', 'node_modules'],
      },
    },
  },
  rules: {
    // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
    'no-prototype-builtins': 'off',
    // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    // Too restrictive: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
    'react/destructuring-assignment': 'off',
    // No jsx extension: https://github.com/facebook/create-react-app/issues/87#issuecomment-234627904
    'react/jsx-filename-extension': 'off',
    'react/jsx-props-no-spreading': 'off',
    // Use function hoisting to improve code readability
    'no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: true },
    ],
    // Common abbreviations are known and readable
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/filename-case': [
      'error',
      { cases: { pascalCase: true, kebabCase: false, camelCase: true } },
    ],
  },
}

module.exports = {
  ...baseConfig,
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      plugins: ['@typescript-eslint'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
      ],
      rules: {
        'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-use-before-define': [
          'error',
          {
            functions: false,
            classes: true,
            variables: true,
            typedefs: true,
          },
        ],
      },
    },
    {
      files: ['src/pages/*.ts', 'src/pages/*.tsx'],
      rules: {
        'import/prefer-default-export': 'error',
        'import/no-default-export': 'off',
      },
    },
  ],
}
