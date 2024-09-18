import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export const buildCssLoader = (isDev: boolean, regularExp = /\.s?[ac]ss$/i) => ({
    test: regularExp,
    exclude: /node_modules/,
    use: [
        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader',
            options: {
                modules: {
                    auto: (path: string) => Boolean(path.includes('.module.')),
                    localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
                },
            },
        },
        'sass-loader',
    ],
});
