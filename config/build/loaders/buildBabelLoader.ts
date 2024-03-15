import BabelTsxPreparePlugin from '../../babel/BabelTsxPreparePlugin';

export const buildBabelLoader = (isDev: boolean, isTSX: boolean) => ({
    test: isTSX ? /\.(tsx|jsx)$/ : /\.(ts|js)$/,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader',
        options: {
            cacheDirectory: true,
            presets: ['@babel/preset-env'],
            plugins: [
                [
                    '@babel/plugin-transform-typescript',
                    {
                        isJSX: isTSX,
                    },
                ],
                ['@babel/plugin-transform-runtime'],
                isTSX && !isDev && [BabelTsxPreparePlugin, {
                    props: ['data-testid'],
                }],
            ].filter(Boolean),
        },
    },
});
