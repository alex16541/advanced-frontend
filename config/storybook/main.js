module.exports = {
    stories: ['../../src/**/*.stories.@(ts|tsx)'],

    addons: [
        '@storybook/addon-links',
        // {
        //     name: '@storybook/addon-essentials',
        //     options: {
        //         background: false,
        //         docs: false,
        //     },
        // },
        '@storybook/addon-interactions',
        'storybook-addon-mock',
        // 'storybook-addon-themes',
    ],

    framework: '@storybook/react-webpack5',

    // docs: {
    //     autodocs: true,
    // },
};
