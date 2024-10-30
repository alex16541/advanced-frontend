import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $isHeadingNode } from '@lexical/rich-text';
import { COMMAND_PRIORITY_LOW, SELECTION_INSERT_CLIPBOARD_NODES_COMMAND } from 'lexical';
import { useEffect } from 'react';

export const DragDropPastePlugin = () => {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        editor.registerCommand(
            SELECTION_INSERT_CLIPBOARD_NODES_COMMAND,
            (data) => {
                data.nodes.forEach((node) => {
                    if ($isHeadingNode(node) && node.getTag() === 'h1') {
                        node.__tag = 'h2';
                    }
                });

                return false;
            },
            COMMAND_PRIORITY_LOW,
        );
    }, [editor]);
    return null;
};
