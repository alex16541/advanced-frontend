import { PluginObj } from '@babel/core';

// eslint-disable-next-line func-names
export default function ():PluginObj {
    return {
        visitor: {
            JSXAttribute(path, state) {
                const opts = state.opts as { props: string[] };
                const props = opts.props || [];
                const atrName = path.node.name.name.toString();

                if (props.includes(atrName)) {
                    path.remove();
                }
            },
        },
    };
}
