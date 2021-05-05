module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    parser: 'babel-eslint',
    plugins: ['@typescript-eslint', 'prefer-arrow', 'import', 'jsdoc', 'sonarjs', 'react-hooks'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:sonarjs/recommended',
        'plugin:prettier/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'prettier',
    ],
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        /**
         * ESLint rules
         */
        curly: 'error',
        'default-case': 'warn',
        eqeqeq: [
            'error',
            'always',
            {
                null: 'ignore',
            },
        ],
        'no-throw-literal': 'error',
        'no-empty': 'warn',
        'no-prototype-builtins': 'warn',
        'no-case-declarations': 'warn',
        'no-ex-assign': 'warn',
        'no-useless-escape': 'warn',
        'no-empty-pattern': 'off',
        'no-extra-boolean-cast': 'warn',
        'no-var': 'error',
        'no-restricted-globals': [
            'error',
            {
                message: 'Please do not commit focused spec descriptions.',
                name: 'fdescribe',
            },
            {
                message: 'Please do not commit focused single tests.',
                name: 'fit',
            },
        ],
        'prefer-promise-reject-errors': 'error',
        'prefer-const': 'error',
        'prefer-spread': 'warn',
        'prefer-rest-params': 'warn',

        /**
         * React rules
         */
        'react/prop-types': 'off',
        'react/no-unescaped-entities': [
            'error',
            {
                forbid: ['>', '}'],
            },
        ],

        /**
         * React Hooks rules
         */
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',

        /**
         * Prettier rules
         */
        'prettier/prettier': 'warn',

        /**
         * Sonar rules
         */
        'sonarjs/no-identical-functions': 'warn',
        'sonarjs/no-inverted-boolean-check': 'warn',
        'sonarjs/no-duplicate-string': 'warn',
        'sonarjs/no-redundant-jump': 'warn',
        'sonarjs/no-small-switch': 'off',
        'sonarjs/cognitive-complexity': 'warn',
        'sonarjs/prefer-immediate-return': 'off',

        /**
         * TSLint rules.
         */
        '@typescript-eslint/ban-types': 'warn',
        '@typescript-eslint/ban-ts-comment': 'warn',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/member-delimiter-style': 'warn',
        '@typescript-eslint/no-empty-function': 'warn',
        '@typescript-eslint/no-use-before-define': 'warn',
        '@typescript-eslint/no-var-requires': 'warn',
        '@typescript-eslint/no-empty-interface': 'warn',
        '@typescript-eslint/no-inferrable-types': 'warn',
        '@typescript-eslint/no-namespace': 'warn',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/naming-convention': [
            'warn',
            {
                selector: 'default',
                format: ['camelCase'],
            },
            {
                selector: 'variable',
                format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
            },
            {
                selector: 'parameter',
                format: ['camelCase'],
                leadingUnderscore: 'allow',
            },
            {
                selector: 'memberLike',
                modifiers: ['private'],
                format: ['camelCase'],
                leadingUnderscore: 'allow',
            },
            { selector: 'memberLike', format: ['camelCase', 'snake_case'] },
            {
                selector: 'memberLike',
                modifiers: ['static'],
                format: ['camelCase'],
            },
            {
                selector: 'typeLike',
                format: ['PascalCase'],
            },
            {
                selector: 'enumMember',
                format: ['PascalCase'],
            },
            {
                selector: 'enum',
                format: ['PascalCase'],
            },
        ],
        '@typescript-eslint/consistent-type-assertions': [
            'warn',
            { assertionStyle: 'as', objectLiteralTypeAssertions: 'never' },
        ],
    },

    // special treatment for tests
    overrides: [
        {
            files: ['*.spec.{ts,tsx}'],
            extends: [
                'plugin:jest/recommended',
                'plugin:jest-dom/recommended',
                'plugin:testing-library/recommended',
            ],
            rules: {
                'prefer-promise-reject-errors': 'off',
                'no-throw-literal': 'off',
                'prefer-const': 'warn',
                '@typescript-eslint/no-throw-literal': 'off',
            },
        },
    ],
};
