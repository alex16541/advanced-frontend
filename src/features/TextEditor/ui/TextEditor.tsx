import { memo, ReactEventHandler, useCallback, useRef, useState } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack';

import { useEditorTextActionMenu } from '../hooks/useEditorTextActionMenu';
import { useTextEditor } from '../hooks/useTextEditor';

import { EditorTextActionMenu } from './EditorTextActionMenu/EditorTextActionMenu';
import cls from './TextEditor.module.scss';
import './TextEditor.css';

interface TextEditorProps {
    className?: string;
    html: string | TrustedHTML;
}

const TextEditor = (props: TextEditorProps) => {
    const { className, html = '' } = props;

    const editorRef = useRef<HTMLDivElement | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const { onSetSelectedTextStyle, onResetSelectedTextStyles, onChangeBlockType } = useTextEditor({
        editorRef,
        setIsTextSelected: (value) => setIsOpen(value ?? false),
    });

    const { refs, floatingStyles, middlewareData, getFloatingProps, setSelection } = useEditorTextActionMenu({
        isOpen,
        setIsOpen: (value) => setIsOpen(value ?? false),
    });

    const handleBeforeInput = useCallback<ReactEventHandler<HTMLDivElement>>(() => {}, []);

    const handleSelectionChange = useCallback<ReactEventHandler<HTMLDivElement>>(() => {
        //         // const element = event.target as HTMLDivElement;
        //         // const text = element.innerText;

        const selection = window.getSelection();
        // const selectionInfo = getSelectionInfo(selection);
        // console.log(selectionInfo);
        setSelection(selection);
    }, [setSelection]);

    return (
        <VStack className={classNames(cls.TextEditor, {}, [className])}>
            <div
                // eslint-disable-next-line react/no-danger
                className={classNames(cls.root, {}, ['editor-root'])}
                dangerouslySetInnerHTML={{ __html: html }}
                ref={editorRef}
                contentEditable
                onBeforeInput={handleBeforeInput}
                onSelectCapture={handleSelectionChange}
            />
            <EditorTextActionMenu
                floatingProps={getFloatingProps()}
                isHidden={middlewareData.hide?.referenceHidden}
                isVisible={isOpen}
                ref={refs.setFloating}
                styles={floatingStyles}
                onApplyStyle={onSetSelectedTextStyle}
                onChangeBlockType={onChangeBlockType}
                onResetFormatting={onResetSelectedTextStyles}
            />
        </VStack>
    );
};

const Memoized = memo(TextEditor);

export { Memoized as TextEditor };
