module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true
    },
    extends: [
        'plugin:i18next/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'airbnb',
        'plugin:storybook/recommended',
        'prettier'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: [
        'import',
        'react',
        'react-hooks',
        '@typescript-eslint',
        'i18next',
        'unused-imports',
        'alex16541-fsd-imports-path-checker'
    ],
    rules: {
        'import/newline-after-import': 'error',
        'import/first': 'error',
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/order': [
            'error',
            {
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true
                },
                pathGroups: [
                    {
                        pattern: '@/**',
                        group: 'internal',
                        position: 'before'
                    }
                ],
                groups: [
                    'index',
                    'builtin',
                    'external',
                    'type',
                    'internal',
                    'parent',
                    'sibling',
                    'object'
                ]
            }
        ],
        'i18next/no-literal-string': [
            2,
            {
                ignore: ['test'],
                ignoreAttribute: [
                    'as',
                    'role',
                    'to',
                    'reducerKey',
                    'data-testid',
                    'dataTestId',
                    'target',
                    'gap',
                    'direction',
                    'align',
                    'justify'
                ],
                markupOnly: true
            }
        ],
        // 'react/jsx-max-props-peer-line': [2, { maximum: 3 }],
        'react/jsx-sort-props': [
            2,
            {
                callbacksLast: true,
                shorthandLast: true,
                multiline: 'last',
                ignoreCase: true
            }
        ],
        'react/jsx-key': 'error',
        'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.tsx'] }],
        'react/jsx-no-bind': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/require-default-props': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/function-component-definition': 'off',
        'max-len': [
            2,
            {
                ignoreComments: true,
                code: 120
            }
        ],
        'new-cap': 'off',
        'no-shadow': 'off',
        'no-unused-vars': 'off',
        'no-underscore-dangle': 'off',
        'no-console': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'no-param-reassign': 'off',
        'no-undef': 'off',
        'react/jsx-no-useless-fragment': 'off',
        'react/no-array-index-key': 'off',
        'unused-imports/no-unused-imports': 'error',
        'alex16541-fsd-imports-path-checker/relative-path-checker': ['error', { alias: '@' }],
        'alex16541-fsd-imports-path-checker/public-api-imports': [
            'error',
            {
                alias: '@',
                testFilesPatterns: ['**/**.test.*', '**/**.stories.*', '**/StoreDecorator.tsx']
            }
        ],
        'alex16541-fsd-imports-path-checker/layers-imports': [
            'error',
            {
                alias: '@',
                ignoreImportsPatterns: ['**/StoreProvider', '**/testing']
            }
        ]
    },
    globals: {
        __IS_DEV__: 'readonly',
        __API__: 'readonly',
        __PROJECT__: 'writable',
        React: 'readonly'
    },
    overrides: [
        {
            files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
            rules: {
                'i18next/no-literal-string': 'off',
                'max-len': 'off'
            }
        }
    ]
};
