const { rules: baseStyleRules } = require('eslint-config-airbnb-base/rules/style');

/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
    root: true,
    extends: [
        'airbnb-base',
    ],
    env: {
        es6: true,
        node: true,
    },
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020,
    },
    rules: {
        // http://eslint.org/docs/rules/
        indent: [
            'error',
            4,
            {
                SwitchCase: 1,
            },
        ],
        'no-underscore-dangle': [
            'error',
            {
                enforceInClassFields: false,
                allowAfterThis: true,
            },
        ],
        'max-len': [
            'error',
            {
                code: 120,
                ignoreStrings: true,
                ignoreRegExpLiterals: true,
                ignoreTemplateLiterals: true,
            },
        ],
        'linebreak-style': ['error', 'unix'],
        'func-style': ['error', 'expression'],
        // @TODO - add more statements
        'no-restricted-syntax': [
            'error',
            'LabeledStatement',
            'WithStatement',
            "BinaryExpression[operator='in']",
            'IfStatement > :not(BlockStatement).consequent',
        ],
        radix: [
            'error',
            'as-needed',
        ],
        'newline-before-return': 'error',
        'no-unused-vars': [
            'warn',
            {
                argsIgnorePattern: '^_',
            },
        ],

        // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules
        'import/no-default-export': 'error',
        'import/prefer-default-export': 'off',
        'import/order': [
            'error',
            {
                groups: [
                    [
                        'builtin',
                        'external',
                    ],
                    'internal',
                    'parent',
                    'sibling',
                    'type',
                ],
                pathGroups: [
                    {
                        pattern: '*@/**',
                        group: 'internal',
                    },
                    {
                        pattern: '*(types)/**',
                        group: 'internal',
                        position: 'after',
                    },
                ],
                pathGroupsExcludedImportTypes: ['builtin', 'type'],
                distinctGroup: true,
                'newlines-between': 'always',
            },
        ],
        'import/extensions': 'off',
        'import/no-duplicates': ['error'],
    },
    overrides: [
        {
            files: ['**/*.ts?(x)'],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                ecmaVersion: 2018,
                sourceType: 'module',
                project: './tsconfig.eslint.json',
                tsconfigRootDir: __dirname,

                // typescript-eslint specific options
                warnOnUnsupportedTypeScriptVersion: true,
            },
            extends: [
                'airbnb-typescript/base',
            ],
            // If adding a typescript-eslint version of
            // an existing ESLint (equivalents) rule,
            // make sure to disable the ESLint rule here.
            rules: {
                'import/extensions': 'off',

                'no-shadow': 'off',
                // https://typescript-eslint.io/rules/
                '@typescript-eslint/no-shadow': 'error',

                '@typescript-eslint/no-explicit-any': 'error',

                semi: 'off',
                '@typescript-eslint/semi': ['error', 'always'],
                quotes: 'off',
                '@typescript-eslint/quotes': 'warn',
                indent: 'off',
                '@typescript-eslint/indent': [
                    'error',
                    4,
                    {
                        ...baseStyleRules.indent[2],
                        SwitchCase: 1,
                        // issues https://github.com/typescript-eslint/typescript-eslint/issues/1824
                        ignoredNodes: [
                            ...baseStyleRules.indent[2].ignoredNodes,
                            'PropertyDefinition[decorators]', // ignore decorators
                            'TSUnionType', // ignore union of types
                            'FunctionExpression[params]:has(Identifier[decorators])',
                        ],
                    },
                ],
                'no-unused-vars': 'off',
                '@typescript-eslint/no-unused-vars': [
                    'warn',
                    {
                        argsIgnorePattern: '^_',
                    },
                ],
                'comma-dangle': 'off',
                '@typescript-eslint/comma-dangle': [
                    'error',
                    { // dont remove
                        arrays: 'always-multiline',
                        objects: 'always-multiline',
                        imports: 'always-multiline',
                        exports: 'always-multiline',
                        functions: 'only-multiline',
                        enums: 'always-multiline',
                        generics: 'never',
                        tuples: 'always-multiline',
                    },
                ],
                '@typescript-eslint/type-annotation-spacing': 'error',
                '@typescript-eslint/explicit-module-boundary-types': 'error',
                '@typescript-eslint/lines-between-class-members': ['error', 'always'],
                '@typescript-eslint/member-ordering': [
                    'error',
                    {
                        default: [
                            'public-field',
                            'protected-field',
                            'private-field',

                            'constructor',

                            'public-abstract-field',
                            'protected-abstract-field',

                            'public-abstract-method',
                            'protected-abstract-method',

                            'public-method',
                            'protected-method',
                            'private-method',
                        ],
                    },
                ],
                '@typescript-eslint/explicit-member-accessibility': [
                    'error',
                    {
                        accessibility: 'no-public',
                    },
                ],
                'import/consistent-type-specifier-style': [
                    'error',
                    'prefer-top-level',
                ],
                '@typescript-eslint/consistent-type-imports': [
                    'error',
                    {
                        prefer: 'type-imports',
                        disallowTypeAnnotations: true,
                        fixStyle: 'separate-type-imports',
                    },
                ],
            },
        },
    ],
};
