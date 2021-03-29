module.exports = {
    env: {
        commonjs: true,
        es6: true,
        node: true,
    },
    extends: ['airbnb-base', 'prettier'],
    plugins: ['prettier'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 11,
    },
    rules: {
        'prettier/prettier': 'error',
        'no-underscore-dangle': 'off',
        'class-methods-use-this': 'off',
        'no-param-reassign': 'off',
        'no-console': 'off',
        'import/no-dynamic-require': 'off',
        radix: 'off',
        camelcase: 'off',
        'no-unused-vars': [
            'error',
            {
                argsIgnorePattern: 'next',
            },
        ],
        'no-return-assign': 'off',
        'array-callback-return': 'off',
        'no-eval': 'off',
        'no-unused-expressions': 'off',
        'prefer-destructuring': 'off',
        'no-case-declarations': 'off',
        'no-plusplus': 'off',
        'no-bitwise': 'off',
        'no-new': 'off',
        'global-require': 'off',
        'no-nested-ternary': 'off',
        'no-undef': 'off',
    },
};
