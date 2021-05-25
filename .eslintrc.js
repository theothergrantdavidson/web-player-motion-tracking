const base = require('./.eslintrc.base.js');
module.exports = {
    ...base,
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
