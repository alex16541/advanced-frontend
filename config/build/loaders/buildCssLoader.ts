import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { RuleSetRule } from 'webpack';

const cssModuleLoader = (isDev: boolean) =>
({
    loader: 'css-loader',
    options: {
        modules: {
            auto: (path: string) => Boolean(path.includes('.module.')),
            localIdentName: isDev
                ? '[path][name]__[local]--[hash:base64:5]'
                : '[hash:base64:8]',
        },
    },
})
export const buildCssLoader = (isDev: boolean, loadCss = true): RuleSetRule[] => {
    const rules: RuleSetRule[] = [
        {
            test: /\.scss$/,
            exclude: /node_modules/,
            oneOf: [
                {
                    test: /\.module\.scss$/,
                    use: [
                        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                        cssModuleLoader(isDev),
                        'sass-loader',
                    ],
                },
                {
                    use: [
                        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader',
                    ],
                }
            ],
        },
    ]

    if (loadCss) rules.push(
        {
            test: /\.css$/,
            oneOf: [
                {
                    test: /\.module\.css$/,
                    use: [
                        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                        cssModuleLoader(isDev),
                    ],
                },
                {
                    use: [
                        isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'
                    ],
                },
            ],
        }
    )

    return rules;
};
