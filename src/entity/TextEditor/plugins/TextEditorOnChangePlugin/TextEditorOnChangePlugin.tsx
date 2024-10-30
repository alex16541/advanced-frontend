import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { EditorState } from 'lexical';
import { useEffect } from 'react';

interface TextEditorOnChangePluginProps {
    onChange: (content: EditorState) => void;
}

export const TextEditorOnChangePlugin = (props: TextEditorOnChangePluginProps) => {
    const { onChange } = props;
    const [editor] = useLexicalComposerContext();

    useEffect(
        () =>
            editor.registerUpdateListener(({ editorState }) => {
                onChange(editorState);
            }),
        [editor, onChange],
    );

    return null;
};
