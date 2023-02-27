import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { BuildOptions } from './types/config';

export function buildDevServer({
    paths,
    port,
}: BuildOptions): DevServerConfiguration {
    return {
        port,
        open: true,
        historyApiFallback: true,
    };
}
