/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
    extends: [
        'airbnb/hooks',
        require.resolve('.'),
    ],
    env: {
        browser: true,
    },
    overrides: [
        {
            files: ['**/*.ts?(x)'],
            extends: [
                'airbnb',
                'next/core-web-vitals',
                require.resolve('.'),
            ],
            // If adding a typescript-eslint version of
            // an existing ESLint (equivalents) rule,
            // make sure to disable the ESLint rule here.
            rules: {
                // react/
                'react/jsx-indent': [
                    'error',
                    4,
                ],
                'react/jsx-indent-props': [
                    'error',
                    4,
                ],
                'react/jsx-props-no-spreading': 'off',
                'react/jsx-max-props-per-line': ['error', {
                    maximum: {
                        single: 3,
                        multi: 1,
                    },
                }],
                // 'react/prop-types': 'off',
                // 'react/jsx-one-expression-per-line': 'off',
                'react/no-unescaped-entities': 'warn',
                // 'react/react-in-jsx-scope': 'off',
                // 'react/require-default-props': 'off',
                // 'react/display-name': 'off',
                'react/function-component-definition': ['error', {
                    namedComponents: 'arrow-function',
                }],
                // 'react-hooks/exhaustive-deps': 'off',

                // jsx-a11y
                // 'jsx-a11y/anchor-is-valid': 'off',
            },
        },
        {
            // Next.js App Router | Pages Routes
            files: ['**/app/**', '**/pages/**'],
            rules: {
                'import/no-default-export': 'off',
                'import/prefer-default-export': 'error',
            },
        },
    ],
};
