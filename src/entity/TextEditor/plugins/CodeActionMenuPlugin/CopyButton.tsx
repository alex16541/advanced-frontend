import { $isCodeNode } from '@lexical/code';
import { $getNearestNodeFromDOMNode, $getSelection, $setSelection, LexicalEditor } from 'lexical';
import { useState } from 'react';

import CheckIcon from '@/shared/assets/svg/check.svg';
import CopyIcon from '@/shared/assets/svg/copy.svg';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '@/shared/ui/redesigned/Icon';

import cls from './CodeActionMenuPlugin.module.scss';

interface Props {
    editor: LexicalEditor;
    getCodeDOMNode: () => HTMLElement | null;
}

export function CopyButton({ editor, getCodeDOMNode }: Props) {
    const [isCopyCompleted, setCopyCompleted] = useState<boolean>(false);

    const removeSuccessIcon = useDebounce(() => {
        setCopyCompleted(false);
    }, 1000);

    async function handleClick(): Promise<void> {
        const codeDOMNode = getCodeDOMNode();

        if (!codeDOMNode) {
            return;
        }

        let content = '';

        editor.update(() => {
            const codeNode = $getNearestNodeFromDOMNode(codeDOMNode);

            if ($isCodeNode(codeNode)) {
                content = codeNode.getTextContent();
            }

            const selection = $getSelection();
            $setSelection(selection);
        });

        try {
            await navigator.clipboard.writeText(content);
            setCopyCompleted(true);
            removeSuccessIcon();
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    }

    return (
        <Icon
            aria-label="copy"
            className={classNames(cls.CopyButton, {}, [cls.Button])}
            Svg={isCopyCompleted ? CheckIcon : CopyIcon}
            clickable
            onClick={handleClick}
            onMouseMove={(e) => {
                e.stopPropagation();
            }}
        />
    );
}
