import HtmlWebpackPlugin from 'html-webpack-plugin';
import { WebpackPluginInstance, ProgressPlugin, DefinePlugin } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { BuildOptions } from './types/config';
import CopyPlugin from 'copy-webpack-plugin';

function buildPlugins({
    paths, isDev, isAnalyze, apiUrl, project,
}: BuildOptions): WebpackPluginInstance[] {
    const plugins: WebpackPluginInstance[] = [
        new HtmlWebpackPlugin({
            template: paths.html,
        }),
        new ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }),
        new DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
            __API__: JSON.stringify(apiUrl),
            __PROJECT__: JSON.stringify(project),
        }),
        new CopyPlugin({
            patterns: [
                {from: 'public/locales', to: 'locales'}
            ]
        }),
    ];

    if (isAnalyze) plugins.push(new BundleAnalyzerPlugin());
    if (isDev) plugins.push(new ReactRefreshPlugin());

    return plugins;
}

export default buildPlugins;
