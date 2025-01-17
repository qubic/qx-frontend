module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'airbnb-typescript',
    'plugin:prettier/recommended',
    'plugin:react/jsx-runtime'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      tsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: __dirname
  },
  plugins: [
    'react-refresh',
    'prettier',
    'unused-imports',
    '@typescript-eslint',
    'simple-import-sort'
  ],
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      typescript: {
        project: './tsconfig.json'
      },
      node: {
        paths: ['src'],
        extensions: ['.ts', '.tsx']
      }
    }
  },
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'prettier/prettier': 'warn',
    'import/no-extraneous-dependencies': 'off',
    'react/require-default-props': 'off',
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }],
    '@typescript-eslint/consistent-type-imports': 'error',
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.ts', '.tsx']
      }
    ],
    'react/prop-types': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Built-in Node.js modules
          ['^node:', '^\\w'],
          // External libraries
          ['^@?\\w'],
          // Internal (aliases like @app/**)
          ['^@app(/.*|$)'],
          // Parent imports
          ['^\\.\\.'],
          // Sibling imports
          ['^\\.'],
          // Style imports
          ['^.+\\.s?css$']
        ]
      }
    ]
  },
  overrides: [
    {
      files: ['src/**/*.tsx'],
      rules: {
        'import/prefer-default-export': 'error'
      }
    },
    {
      files: ['src/**/*.ts', 'src/**/*.js'],
      rules: {
        'import/prefer-default-export': 'off'
      }
    }
  ]
}
