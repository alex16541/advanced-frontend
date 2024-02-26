module.exports = {
    stories: ['../../src/**/*.stories.@(ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        'storybook-addon-mock',
    ],
    framework: '@storybook/react',
    core: {
        builder: 'webpack5',
    },
};
