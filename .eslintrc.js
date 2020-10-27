module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
        jest: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/member-delimiter-style': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        'react/no-unescaped-entities': 'off',
        'react/prop-types': 'off',
        'linebreak-style': ['error', 'unix'],
        indent: 'off',
        quotes: 'off',
        semi: ['error', 'never'],
    },
    settings: {
        react: {
            version: '16.13',
        },
    },
}