import webpack from 'webpack';

function buildResolvers(): webpack.ResolveOptions {
    return {
        extensions: ['.tsx', '.ts', '.js'],
    }
}

export default buildResolvers;