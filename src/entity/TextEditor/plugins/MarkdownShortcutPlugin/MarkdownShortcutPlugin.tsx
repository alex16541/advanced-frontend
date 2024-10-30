import { Transformer } from '@lexical/markdown';
import { MarkdownShortcutPlugin as LexicalMarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';

import { ALL_EDITOR_TRANSFORMERS, TEXT_EDITOR_TRANSFORMERS } from '../../lib/markdownTransformers';

type TransformersType = 'all' | 'text';

interface MarkdownShortcutPluginProps {
    transformersType?: TransformersType;
}

const transformersTypeToTrsnsformers: Record<TransformersType, Transformer[]> = {
    all: ALL_EDITOR_TRANSFORMERS,
    text: TEXT_EDITOR_TRANSFORMERS,
};

export const MarkdownShortcutPlugin = (props: MarkdownShortcutPluginProps) => {
    const { transformersType = 'all' } = props;

    return <LexicalMarkdownShortcutPlugin transformers={transformersTypeToTrsnsformers[transformersType]} />;
};
