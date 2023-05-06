/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
    branches: [
        {
            name: 'master',
        },
    ],
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        '@semantic-release/changelog',
        '@semantic-release/npm',
        '@semantic-release/git',
        '@semantic-release/github',
    ],
};
