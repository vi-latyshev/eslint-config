// eslint-disable-next-line import/order
const { rules: baseStyleRules } = require('eslint-config-airbnb-base/rules/style');

/*
 * @rushstack/eslint-patch is used to include plugins as dev
 * dependencies instead of imposing them as peer dependencies
 *
 * https://www.npmjs.com/package/@rushstack/eslint-patch
 *
 * inspired by eslint-config-next
 */
const keptPaths = [];
const sortedPaths = [];
const cwd = process.cwd().replace(/\\/g, '/');
const originalPaths = require.resolve.paths('eslint-plugin-import');

// eslint throws a conflict error when plugins resolve to different
// locations, since we want to lock our dependencies by default
// but also need to allow using user dependencies this updates
// our resolve paths to first check the cwd and iterate to
// eslint-config-next's dependencies if needed

for (let i = originalPaths.length - 1; i >= 0; i--) {
    const currentPath = originalPaths[i];

    if (currentPath.replace(/\\/g, '/').startsWith(cwd)) {
        sortedPaths.push(currentPath);
    } else {
        keptPaths.unshift(currentPath);
    }
}

// maintain order of node_modules outside of cwd
sortedPaths.push(...keptPaths);

const hookPropertyMap = new Map(
    [
        'eslint-plugin-import',
        'eslint-config-airbnb-base',
        // typescript
        '@typescript-eslint/parser',
        '@typescript-eslint/eslint-plugin',
        'eslint-config-airbnb-typescript',
        // react
        'eslint-plugin-react',
        'eslint-plugin-react-hooks',
        'eslint-plugin-jsx-a11y',
    ].map((request) => [request, require.resolve(request, { paths: sortedPaths })]),
);

const mod = require('module');

/* eslint-disable no-underscore-dangle, func-names, no-param-reassign */
const resolveFilename = mod._resolveFilename;
mod._resolveFilename = function (request, parent, isMain, options) {
    const hookResolved = hookPropertyMap.get(request);
    if (hookResolved) {
        request = hookResolved;
    }

    return resolveFilename.call(mod, request, parent, isMain, options);
};
/* eslint-enable */

require('@rushstack/eslint-patch/modern-module-resolution');

/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
    root: true,
    extends: ['airbnb-base'],
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
        'linebreak-style': ['warn', 'unix'],
        'func-style': ['error', 'expression'],
        'func-names': [
            'error',
            'never',
            { generators: 'as-needed' },
        ],
        // @TODO - add more statements
        'no-restricted-syntax': [
            'error',
            'LabeledStatement',
            'WithStatement',
            "BinaryExpression[operator='in']",
            'IfStatement > :not(BlockStatement).consequent',
        ],
        'no-plusplus': [
            'error',
            {
                allowForLoopAfterthoughts: true,
            },
        ],
        radix: ['error', 'as-needed'],
        'newline-before-return': 'error',
        'no-unused-vars': [
            'warn',
            {
                argsIgnorePattern: '^_',
            },
        ],
        'array-bracket-newline': ['error', { multiline: true, minItems: 3 }],
        'array-element-newline': ['error', { multiline: true, minItems: 3 }],
        'object-curly-spacing': ['error', 'always'],
        'object-curly-newline': [
            'error',
            {
                consistent: true,
                minProperties: 3,
            },
        ],

        // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules
        'import/no-default-export': 'error',
        'import/prefer-default-export': 'off',
        'import/order': [
            'error',
            {
                groups: [
                    ['builtin', 'external'],
                    'internal',
                    'parent',
                    'index',
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
                'newlines-between': 'always',
                warnOnUnassignedImports: true,
                distinctGroup: false,
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
            extends: ['airbnb-typescript/base'],
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
                '@typescript-eslint/lines-between-class-members': [
                    'error',
                    'always',
                    {
                        exceptAfterOverload: true,
                        exceptAfterSingleLine: true,
                    },
                ],
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
                '@typescript-eslint/consistent-type-imports': [
                    'error',
                    {
                        prefer: 'type-imports',
                        disallowTypeAnnotations: true,
                        fixStyle: 'separate-type-imports',
                    },
                ],

                // imports
                'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
            },
        },
    ],
};
