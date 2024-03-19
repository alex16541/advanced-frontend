module.exports = {
    stories: ['../../src/**/*.stories.@(ts|tsx)'],

    addons: [
        '@storybook/addon-links',
        {
            name: '@storybook/addon-essentials',
            options: {
                docs: false,
            },
        },
        '@storybook/addon-interactions',
        'storybook-addon-mock',
    ],
    staticDirs: ['../../src/shared/assets'],

    framework: '@storybook/react-webpack5',
};
