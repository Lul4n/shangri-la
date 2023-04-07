module.exports = {
    extends: [
        "eslint:recommended",
        'plugin:@typescript-eslint/recommended',
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:@typescript-eslint/strict"
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    parserOptions: {
        project: ['tsconfig.json'],
    },
    ignorePatterns: ["*.js"],
    root: true,
    rules:{
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-useless-constructor': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',

        '@typescript-eslint/no-unused-vars': 'error'

    }
};