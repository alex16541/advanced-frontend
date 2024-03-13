import { Configuration as DevServerConfiguration } from 'webpack-dev-server';

import { BuildOptions } from './types/config';

export function buildDevServer({ isDev, paths, port }: BuildOptions): DevServerConfiguration {
    return {
        port,
        open: true,
        hot: isDev,
        historyApiFallback: true,
    };
}
