import webpack from 'webpack';

import { buildBabelLoader } from './loaders/buildBabelLoader';
import { buildCssLoader } from './loaders/buildCssLoader';
import { buildSvgLoader } from './loaders/buildSvgLoader';
import { BuildOptions } from './types/config';

function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
    const svgLoader = buildSvgLoader();
    const cssLoader = buildCssLoader(isDev);
    const babelTsxLoader = buildBabelLoader(isDev, true);
    const babelCodeLoader = buildBabelLoader(isDev, false);

    const fileLoader = {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    };

    // const typescriptLoader = {
    //     test: /\.tsx?$/,
    //     use: 'ts-loader',
    //     exclude: /node_modules/,
    // };

    return [babelTsxLoader, babelCodeLoader, ...cssLoader, svgLoader, fileLoader];
}

export default buildLoaders;
