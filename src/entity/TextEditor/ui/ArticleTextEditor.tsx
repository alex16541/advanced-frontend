import { CodeNode, CodeHighlightNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { InitialConfigType, InitialEditorStateType, LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { EditorState } from 'lexical';
import { memo, useCallback, useState } from 'react';
import './TextEditor.scss';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';

import AutoLinkPlugin from '../plugins/AutoLinkPlugin/AutoLinkPlugin';
import CodeActionMenuPlugin from '../plugins/CodeActionMenuPlugin/CodeActionMenuPlugin';
import { CodeHighlightPlugin } from '../plugins/CodeHighlightPlugin/CodeHighlightPlugin';
import { ComponentPickerMenuPlugin } from '../plugins/ComponentPickerPlugin/ComponentPickerPlugin';
import { DragDropPastePlugin } from '../plugins/DragDropPastePlugin/DragDropPastePlugin';
import { DraggableBlockPlugin } from '../plugins/FloattingActionsMenu/FloattingActionsMenu';
// eslint-disable-next-line max-len
import { FloatingTextFormatToolbarPlugin } from '../plugins/FloattingTextFormatToolbarPlugin/FloatingTextFormatToolbarPlugin';
import { ImageNode } from '../plugins/ImagesPlugin/ImageNode';
import ImagesPlugin from '../plugins/ImagesPlugin/ImagesPlugin';
import ListMaxIndentLevelPlugin from '../plugins/ListMaxIndentLevelPlugin/ListMaxIndentLevelPlugin';
import { MarkdownShortcutPlugin } from '../plugins/MarkdownShortcutPlugin/MarkdownShortcutPlugin';
import { TextEditorOnChangePlugin } from '../plugins/TextEditorOnChangePlugin/TextEditorOnChangePlugin';

import theme from './TextEditorTheme';
import '../i18n/i18n';

interface TextEditorProps {
    className?: string;
    content?: InitialEditorStateType;
    onChange?: (content: EditorState) => void;
    editable?: boolean;
    namespace?: string;
}
const ArticleTextEditor = (props: TextEditorProps) => {
    const { className, content, onChange, editable = false, namespace = 'ArticleTextEditor' } = props;
    const { t } = useTranslation('TextEditor');

    const [rootRef, setRootRef] = useState<HTMLDivElement | undefined>(undefined);
    const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);

    function onError(error: Error) {
        console.error(error);
    }
    const onRef = (_floatingAnchorElem: HTMLDivElement) => {
        if (_floatingAnchorElem !== null) {
            setRootRef(_floatingAnchorElem);
        }
    };

    const onChangeHandler = useCallback(
        (editorState: EditorState) => {
            if (editorState) {
                onChange?.(editorState);
            }
        },
        [onChange],
    );

    const placeholder = t('placeholder');

    const initialConfig: InitialConfigType = {
        namespace,
        theme,
        onError,
        editorState: content,
        editable,
        nodes: [
            ListItemNode,
            ListNode,
            HeadingNode,
            QuoteNode,
            CodeNode,
            CodeHighlightNode,
            AutoLinkNode,
            LinkNode,
            ImageNode,
        ],
    };

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <div className={classNames('editor-container', {}, [className])} ref={onRef}>
                <RichTextPlugin
                    ErrorBoundary={LexicalErrorBoundary}
                    contentEditable={
                        <ContentEditable
                            aria-placeholder={placeholder}
                            className="editor-input"
                            placeholder={<div className="editor-placeholder">{placeholder}</div>}
                        />
                    }
                />
                {editable && (
                    <>
                        <ListPlugin />
                        <CheckListPlugin />
                        <ImagesPlugin />
                        <CodeHighlightPlugin />
                        <DragDropPastePlugin />
                        <TextEditorOnChangePlugin onChange={onChangeHandler} />
                        <ComponentPickerMenuPlugin />
                        <AutoLinkPlugin />
                        <HistoryPlugin />
                        <TabIndentationPlugin />
                        <ListMaxIndentLevelPlugin />
                        <MarkdownShortcutPlugin />
                    </>
                )}

                {rootRef && <CodeActionMenuPlugin anchorElem={rootRef} />}

                {editable && rootRef && (
                    <>
                        <DraggableBlockPlugin anchorElem={rootRef} />
                        <FloatingTextFormatToolbarPlugin
                            anchorElem={rootRef}
                            setIsLinkEditMode={setIsLinkEditMode}
                        />
                    </>
                )}
            </div>
        </LexicalComposer>
    );
};

const Memoized = memo(ArticleTextEditor);

export { Memoized as ArticleTextEditor };
