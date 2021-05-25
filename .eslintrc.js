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
        'react-hooks/rules-of-hooks': 'warn',
        'react-hooks/exhaustive-deps': 'warn',
        'no-throw-literal': 'off',
        '@typescript-eslint/no-throw-literal': 'error',
        '@typescript-eslint/no-floating-promises': ['warn', { ignoreVoid: false }],
    },
};
