import path from 'path';
import webpack, { RuleSetRule, DefinePlugin } from 'webpack';
import { BuildPaths } from '../build/types/config';
import { buildCssLoader } from '../build/loaders/buildCssLoader';
import { buildSvgLoader } from '../build/loaders/buildSvgLoader';

export default ({ config }: { config: webpack.Configuration }) => {
    const paths: BuildPaths = {
        entry: '',
        output: '',
        html: '',
        src: path.resolve(__dirname, '..', '..', 'src'),
    };
    config.resolve!.modules!.push(paths.src);
    if (config.resolve) {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': path.resolve(paths.src),
        };
    }
    config.module!.rules!.push(buildCssLoader(true));

    // eslint-disable-next-line no-param-reassign
    config.module!.rules = config.module!.rules!.map(
        // @ts-ignore
        (rule: RuleSetRule) => (/svg/.test(rule.test as string) ? { ...rule, exclude: /\.svg$/i } : rule),
    );
    config.plugins!.push(
        new DefinePlugin({
            __IS_DEV__: true,
            __API__: JSON.stringify('https://testapi.ru'),
            __PROJECT__: JSON.stringify('storybook'),
        }),
    );

    config.module!.rules.push(buildSvgLoader());

    return config;
};
