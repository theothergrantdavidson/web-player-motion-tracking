const base = require('./.eslintrc.base.js');

// Enable type-aware static analysis.
// This will ask TypeScript to do a build of the project before ESLint.
module.exports = {
    ...base,
    // this is separated from the .eslint.base.js in order to speed up eslint in precommit hook
    // using parserOptions will have TypeScript to do a build of a project before linting
    // see:
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/TYPED_LINTING.md
    parserOptions: {
        project: __dirname + '/tsconfig.json',
        sourceType: 'module'
    },
    rules: {
        ...base.rules,

        // These rules are errors in .eslintrc.base.js, which is used by the
        // pre-commit hook. This file is the one used by CI so we're going to
        // only warn for the time being. We will remove this once we fix all our
        // code, or add ignore comments where we have exceptions to the rule, so
        // that we error in CI as we do in pre-commit.
        'react-hooks/rules-of-hooks': 'warn',
        'react-hooks/exhaustive-deps': 'warn',

        // use the type checking no-throw-literal in the full check
        'no-throw-literal': 'off',
        '@typescript-eslint/no-throw-literal': 'error',
        '@typescript-eslint/no-floating-promises': ['warn', { ignoreVoid: false }],
    },
};
