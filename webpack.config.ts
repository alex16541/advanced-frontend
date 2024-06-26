import path from 'path';

import webpack from 'webpack';

import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildEnv, BuildMode, BuildPaths } from './config/build/types/config';

export default (env: BuildEnv) => {
    const mode: BuildMode = env?.mode || 'development';
    const isDev = mode === 'development';
    const apiUrl = env?.apiUrl || 'http://localhost:8000';
    const port = env?.port || 3000;
    const isAnalyze = env?.analyze || false;
    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        output: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
    };
    const project = 'frontend';

    const config: webpack.Configuration = buildWebpackConfig({
        mode,
        paths,
        isDev,
        isAnalyze,
        port,
        apiUrl,
        project,
    });

    return config;
};
