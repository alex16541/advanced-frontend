import { $isCodeNode, CodeNode, getLanguageFriendlyName } from '@lexical/code';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getNearestNodeFromDOMNode } from 'lexical';
import { useEffect, useRef, useState } from 'react';
import * as React from 'react';
import { createPortal } from 'react-dom';

import { useDebounce } from '@/shared/hooks/useDebounce';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './CodeActionMenuPlugin.module.scss';
import { CopyButton } from './CopyButton';
import { LanguageSelect } from './LanguageSelect';

const CODE_PADDING = 8;

interface Position {
    top: string;
    right: string;
}

function getMouseInfo(event: MouseEvent): {
    codeDOMNode: HTMLElement | null;
    isOutside: boolean;
} {
    const { target } = event;

    if (target && target instanceof HTMLElement) {
        const codeDOMNode = target.closest<HTMLElement>('code.editor-code');
        const isOutside = !(codeDOMNode || target.closest<HTMLElement>('div.code-action-menu-container'));

        return { codeDOMNode, isOutside };
    }
    return { codeDOMNode: null, isOutside: true };
}

function CodeActionMenuContainer({ anchorElem }: { anchorElem: HTMLElement }): JSX.Element {
    const [editor] = useLexicalComposerContext();

    const [lang, setLang] = useState('');
    const [isShown, setShown] = useState<boolean>(false);
    const [shouldListenMouseMove, setShouldListenMouseMove] = useState<boolean>(false);
    const [position, setPosition] = useState<Position>({
        right: '0',
        top: '0',
    });
    const codeSetRef = useRef<Set<string>>(new Set());
    const codeDOMNodeRef = useRef<HTMLElement | null>(null);

    function getCodeDOMNode(): HTMLElement | null {
        return codeDOMNodeRef.current;
    }

    const debouncedOnMouseMove = useDebounce((event: MouseEvent) => {
        const { codeDOMNode, isOutside } = getMouseInfo(event);

        if (isOutside) {
            setShown(false);
            return;
        }

        if (!codeDOMNode) {
            return;
        }

        codeDOMNodeRef.current = codeDOMNode;

        let codeNode: CodeNode | null = null;
        let _lang = '';

        editor.update(() => {
            const maybeCodeNode = $getNearestNodeFromDOMNode(codeDOMNode);

            if ($isCodeNode(maybeCodeNode)) {
                codeNode = maybeCodeNode;
                _lang = codeNode.getLanguage() || '';
            }
        });

        if (codeNode) {
            const { y: editorElemY, right: editorElemRight } = anchorElem.getBoundingClientRect();
            const { y, right } = codeDOMNode.getBoundingClientRect();
            setLang(_lang);
            setShown(true);
            setPosition({
                right: `${editorElemRight - right + CODE_PADDING}px`,
                top: `${y - editorElemY + CODE_PADDING}px`,
            });
        }
    }, 50);

    useEffect(() => {
        if (!shouldListenMouseMove) {
            return () => {};
        }

        document.addEventListener('mousemove', debouncedOnMouseMove);

        return () => {
            // setShown(false);
            document.removeEventListener('mousemove', debouncedOnMouseMove);
        };
    }, [shouldListenMouseMove, debouncedOnMouseMove]);

    useEffect(
        () =>
            editor.registerMutationListener(
                CodeNode,
                (mutations) => {
                    editor.getEditorState().read(() => {
                        mutations.forEach((type, key) => {
                            switch (type) {
                                case 'created':
                                    codeSetRef.current.add(key);
                                    break;

                                case 'destroyed':
                                    codeSetRef.current.delete(key);
                                    setShown(false);
                                    break;

                                default:
                                    break;
                            }
                        });
                    });
                    setShouldListenMouseMove(codeSetRef.current.size > 0);
                },
                { skipInitialization: false },
            ),
        [editor],
    );

    const codeFriendlyName = getLanguageFriendlyName(lang);

    return (
        <>
            {isShown ? (
                <div
                    className={classNames(cls.CodeActionMenuContainer, {}, ['code-action-menu-container'])}
                    style={{ ...position }}
                >
                    <LanguageSelect editor={editor} getCodeDOMNode={getCodeDOMNode} lang={lang} />
                    <CopyButton editor={editor} getCodeDOMNode={getCodeDOMNode} />
                </div>
            ) : null}
        </>
    );
}

export default function CodeActionMenuPlugin({
    anchorElem = document.body,
}: {
    anchorElem?: HTMLElement;
}): React.ReactPortal | null {
    return createPortal(<CodeActionMenuContainer anchorElem={anchorElem} />, anchorElem);
}
