module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:@typescript-eslint/recommended-requiring-type-checking', 'plugin:@typescript-eslint/strict', 'prettier'],
    overrides: [],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    parserOptions: {
        project: ['tsconfig.json'],
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    ignorePatterns: ['*.js'],
    root: true,
    rules: {
        quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],

        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-useless-constructor': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/no-useless-escape': 'off',

        '@typescript-eslint/no-unused-vars': 'error',
    },
};
