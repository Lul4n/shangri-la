/** @type {import('jest').Config} */
const config = {
    verbose: true,
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
};
module.exports = config;
