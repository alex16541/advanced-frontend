import htmlWebpackPlugin from 'html-webpack-plugin';
import { WebpackPluginInstance, ProgressPlugin, DefinePlugin } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { BuildOptions } from './types/config';

function buildPlugins({ paths, isDev, isAnalyze }: BuildOptions): WebpackPluginInstance[] {
    const plugins: WebpackPluginInstance[] = [
        new htmlWebpackPlugin({
            template: paths.html,
        }),
        new ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }),
        new DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
        }),

    ];

    if (isAnalyze) plugins.push(new BundleAnalyzerPlugin());

    return plugins;
}

export default buildPlugins;
