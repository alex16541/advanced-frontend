module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: ['plugin:i18next/recommended', 'plugin:react/recommended', 'plugin:react-hooks/recommended', 'airbnb'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', 'react-hooks', '@typescript-eslint', 'i18next'],
    rules: {
        indent: [2, 4, { SwitchCase: 1 }],
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'import/no-extraneous-dependencies': 'off',
        'i18next/no-literal-string': [
            2,
            {
                ignore: ['test'],
                ignoreAttribute: ['to', 'reducerKey', 'data-testid', 'target'],
                markupOnly: true,
            },
        ],
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.tsx'] }],
        'react/jsx-no-bind': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/require-default-props': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/function-component-definition': 'off',
        'max-len': [2, { ignoreComments: true, code: 120 }],
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
    },
    globals: {
        __IS_DEV__: 'readonly',
        __API__: 'readonly',
        __PROJECT__: 'writable',
        React: 'readonly',
    },
    overrides: [
        {
            files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
            rules: {
                'i18next/no-literal-string': 'off',
                'max-len': 'off',
            },
        },
    ],
};
