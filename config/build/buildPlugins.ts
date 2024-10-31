import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { WebpackPluginInstance, ProgressPlugin, DefinePlugin } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import { BuildOptions } from './types/config';

function buildPlugins({
    paths, isDev, isAnalyze, apiUrl, project,
}: BuildOptions): WebpackPluginInstance[] {
    const isProd = !isDev;

    const plugins: WebpackPluginInstance[] = [
        new HtmlWebpackPlugin({
            template: paths.html,
        }),
        new ProgressPlugin(),
        new DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
            __API__: JSON.stringify(apiUrl),
            __PROJECT__: JSON.stringify(project),
        }),
        new ForkTsCheckerWebpackPlugin(),
    ];

    if (isAnalyze) plugins.push(new BundleAnalyzerPlugin());

    if (isDev) {
        plugins.push(new ReactRefreshPlugin());
        plugins.push(new CircularDependencyPlugin({
            exclude: /a\.js|node_modules/,
            failOnError: true,
        }));
    }

    if (isProd) {
        plugins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }));
    }

    return plugins;
}

export default buildPlugins;
