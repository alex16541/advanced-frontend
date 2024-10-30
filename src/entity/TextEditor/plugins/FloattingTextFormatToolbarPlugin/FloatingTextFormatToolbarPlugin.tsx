import { $isCodeHighlightNode } from '@lexical/code';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';
import {
    $getSelection,
    $isElementNode,
    $isParagraphNode,
    $isRangeSelection,
    $isTextNode,
    COMMAND_PRIORITY_LOW,
    ElementFormatType,
    FORMAT_ELEMENT_COMMAND,
    FORMAT_TEXT_COMMAND,
    LexicalEditor,
    SELECTION_CHANGE_COMMAND,
    TextFormatType,
} from 'lexical';
import { Dispatch, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import AlignCenterIcon from '@/shared/assets/svg/awesome_icons/align-center-solid.svg';
import AlignJustifyIcon from '@/shared/assets/svg/awesome_icons/align-justify-solid.svg';
import AlignLeftIcon from '@/shared/assets/svg/awesome_icons/align-left-solid.svg';
import AlignRightIcon from '@/shared/assets/svg/awesome_icons/align-right-solid.svg';
import BoldIcon from '@/shared/assets/svg/awesome_icons/bold-solid.svg';
import CodeIcon from '@/shared/assets/svg/awesome_icons/code-solid.svg';
import ItalicIcon from '@/shared/assets/svg/awesome_icons/italic-solid.svg';
import LinkIcon from '@/shared/assets/svg/awesome_icons/link-solid.svg';
import StrikethroughIcon from '@/shared/assets/svg/awesome_icons/strikethrough-solid.svg';
// import SubscriptIcon from '@/shared/assets/svg/awesome_icons/subscript-solid.svg';
// import SuperscriptIcon from '@/shared/assets/svg/awesome_icons/superscript-solid.svg';
import UnderlineIcon from '@/shared/assets/svg/awesome_icons/underline-solid.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon, SvgType } from '@/shared/ui/redesigned/Icon';

import { getDOMRangeRect } from '../../lib/getDOMRangeRect';
import { getSelectedNode } from '../../lib/getSelectedNode';
import { setFloatingElemPosition } from '../../lib/setFloatingElemPosition';

import cls from './FloatingTextFormatToolbarPlugin.module.scss';

// import {INSERT_INLINE_COMMAND} from '../CommentPlugin';

interface FormatButtonProps {
    label: string;
    icon: SvgType;
    active: boolean;
    onClick: () => void;
}

function TextFormatFloatingToolbar({
    editor,
    anchorElem,
    isLink,
    isBold,
    isItalic,
    isUnderline,
    isCode,
    isStrikethrough,
    isSubscript,
    isSuperscript,
    align,
    setIsLinkEditMode,
}: {
    editor: LexicalEditor;
    anchorElem: HTMLElement;
    isBold: boolean;
    isCode: boolean;
    isItalic: boolean;
    isLink: boolean;
    isStrikethrough: boolean;
    isSubscript: boolean;
    isSuperscript: boolean;
    isUnderline: boolean;
    align: ElementFormatType;
    setIsLinkEditMode?: Dispatch<boolean>;
}): JSX.Element {
    const popupCharStylesEditorRef = useRef<HTMLDivElement | null>(null);

    const insertLink = useCallback(() => {
        if (!isLink) {
            setIsLinkEditMode?.(true);
            editor.dispatchCommand(TOGGLE_LINK_COMMAND, 'https://');
        } else {
            setIsLinkEditMode?.(false);
            editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
        }
    }, [editor, isLink, setIsLinkEditMode]);

    const formatElement = useCallback(
        (align: 'center' | 'left' | 'right' | 'justify') => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, align);
        },
        [editor],
    );

    function mouseMoveListener(e: MouseEvent) {
        if (popupCharStylesEditorRef?.current && (e.buttons === 1 || e.buttons === 3)) {
            if (popupCharStylesEditorRef.current.style.pointerEvents !== 'none') {
                const x = e.clientX;
                const y = e.clientY;
                const elementUnderMouse = document.elementFromPoint(x, y);

                if (!popupCharStylesEditorRef.current.contains(elementUnderMouse)) {
                    // Mouse is not over the target element => not a normal click, but probably a drag
                    popupCharStylesEditorRef.current.style.pointerEvents = 'none';
                }
            }
        }
    }
    function mouseUpListener(e: MouseEvent) {
        if (popupCharStylesEditorRef?.current) {
            if (popupCharStylesEditorRef.current.style.pointerEvents !== 'auto') {
                popupCharStylesEditorRef.current.style.pointerEvents = 'auto';
            }
        }
    }

    const formatText = useCallback(
        (command: TextFormatType) => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, command);
        },
        [editor],
    );

    const buttons = useMemo(() => {
        const btns: FormatButtonProps[] = [
            {
                icon: BoldIcon,
                active: isBold,
                onClick: () => formatText('bold'),
                label: 'Format text as Bold',
            },
            {
                icon: ItalicIcon,
                active: isItalic,
                onClick: () => formatText('italic'),
                label: 'Format text as Italic',
            },
            {
                icon: UnderlineIcon,
                active: isUnderline,
                onClick: () => formatText('underline'),
                label: 'Format text as Underline',
            },
            {
                icon: StrikethroughIcon,
                active: isStrikethrough,
                onClick: () => formatText('strikethrough'),
                label: 'Format text as Strikethrough',
            },
            {
                icon: CodeIcon,
                active: isCode,
                onClick: () => formatText('code'),
                label: 'Format text as Code',
            },
            {
                icon: LinkIcon,
                active: isLink,
                onClick: insertLink,
                label: 'Insert link',
            },
            {
                icon: AlignLeftIcon,
                active: align === 'left',
                onClick: () => formatElement('left'),
                label: 'Align left',
            },
            {
                icon: AlignCenterIcon,
                active: align === 'center',
                onClick: () => formatElement('center'),
                label: 'Align center',
            },
            {
                icon: AlignRightIcon,
                active: align === 'right',
                onClick: () => formatElement('right'),
                label: 'Align right',
            },
            {
                icon: AlignJustifyIcon,
                active: align === 'justify',
                onClick: () => formatElement('justify'),
                label: 'Align justify',
            },
        ];

        return btns;
    }, [
        align,
        formatElement,
        formatText,
        insertLink,
        isBold,
        isCode,
        isItalic,
        isLink,
        isStrikethrough,
        isUnderline,
    ]);

    useEffect(() => {
        if (popupCharStylesEditorRef?.current) {
            document.addEventListener('mousemove', mouseMoveListener);
            document.addEventListener('mouseup', mouseUpListener);

            return () => {
                document.removeEventListener('mousemove', mouseMoveListener);
                document.removeEventListener('mouseup', mouseUpListener);
            };
        }

        return () => {};
    }, [popupCharStylesEditorRef]);

    const $updateTextFormatFloatingToolbar = useCallback(() => {
        const selection = $getSelection();

        const popupCharStylesEditorElem = popupCharStylesEditorRef.current;
        const nativeSelection = window.getSelection();

        if (popupCharStylesEditorElem === null) {
            return;
        }

        const rootElement = editor.getRootElement();
        if (
            selection !== null &&
            nativeSelection !== null &&
            !nativeSelection.isCollapsed &&
            rootElement !== null &&
            rootElement.contains(nativeSelection.anchorNode)
        ) {
            const rangeRect = getDOMRangeRect(nativeSelection, rootElement);

            setFloatingElemPosition(rangeRect, popupCharStylesEditorElem, anchorElem, isLink);
        }
    }, [editor, anchorElem, isLink]);

    useEffect(() => {
        const scrollerElem = anchorElem.parentElement;

        const update = () => {
            editor.getEditorState().read(() => {
                $updateTextFormatFloatingToolbar();
            });
        };

        window.addEventListener('resize', update);
        if (scrollerElem) {
            scrollerElem.addEventListener('scroll', update);
        }

        return () => {
            window.removeEventListener('resize', update);
            if (scrollerElem) {
                scrollerElem.removeEventListener('scroll', update);
            }
        };
    }, [editor, $updateTextFormatFloatingToolbar, anchorElem]);

    useEffect(() => {
        editor.getEditorState().read(() => {
            $updateTextFormatFloatingToolbar();
        });
        return mergeRegister(
            editor.registerUpdateListener(({ editorState }) => {
                editorState.read(() => {
                    $updateTextFormatFloatingToolbar();
                });
            }),

            editor.registerCommand(
                SELECTION_CHANGE_COMMAND,
                () => {
                    $updateTextFormatFloatingToolbar();
                    return false;
                },
                COMMAND_PRIORITY_LOW,
            ),
        );
    }, [editor, $updateTextFormatFloatingToolbar]);

    return (
        <div className={cls.FloatingTextFormatToolbar} ref={popupCharStylesEditorRef}>
            {editor.isEditable() && (
                <>
                    {buttons.map((button) => (
                        <Icon
                            aria-label={button.label}
                            className={classNames(cls.item, { [cls.active]: button.active })}
                            key={button.label}
                            Svg={button.icon}
                            clickable
                            onClick={button.onClick}
                        />
                    ))}
                </>
            )}
        </div>
    );
}

function useFloatingTextFormatToolbar(
    editor: LexicalEditor,
    anchorElem: HTMLElement,
    setIsLinkEditMode?: Dispatch<boolean>,
): JSX.Element | null {
    const [isText, setIsText] = useState(false);
    const [isLink, setIsLink] = useState(false);
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isStrikethrough, setIsStrikethrough] = useState(false);
    const [isSubscript, setIsSubscript] = useState(false);
    const [isSuperscript, setIsSuperscript] = useState(false);
    const [isCode, setIsCode] = useState(false);
    const [align, setAlign] = useState<ElementFormatType>('left');

    const updatePopup = useCallback(() => {
        editor.getEditorState().read(() => {
            // Should not to pop up the floating toolbar when using IME input
            if (editor.isComposing()) {
                return;
            }
            const selection = $getSelection();
            const nativeSelection = window.getSelection();
            const rootElement = editor.getRootElement();

            if (
                nativeSelection !== null &&
                (!$isRangeSelection(selection) ||
                    rootElement === null ||
                    !rootElement.contains(nativeSelection.anchorNode))
            ) {
                setIsText(false);
                return;
            }

            if (!$isRangeSelection(selection)) {
                return;
            }

            const node = getSelectedNode(selection);

            // Update text format
            setIsBold(selection.hasFormat('bold'));
            setIsItalic(selection.hasFormat('italic'));
            setIsUnderline(selection.hasFormat('underline'));
            setIsStrikethrough(selection.hasFormat('strikethrough'));
            setIsSubscript(selection.hasFormat('subscript'));
            setIsSuperscript(selection.hasFormat('superscript'));
            setIsCode(selection.hasFormat('code'));

            const parent = node.getParent();

            // Update alignment
            if ($isElementNode(node)) {
                setAlign(node.getFormatType() || 'left');
            } else if ($isElementNode(parent)) {
                setAlign(parent.getFormatType() || 'left');
            }

            // Update links
            if ($isLinkNode(parent) || $isLinkNode(node)) {
                setIsLink(true);
            } else {
                setIsLink(false);
            }

            if (!$isCodeHighlightNode(selection.anchor.getNode()) && selection.getTextContent() !== '') {
                setIsText($isTextNode(node) || $isParagraphNode(node));
            } else {
                setIsText(false);
            }

            const rawTextContent = selection.getTextContent().replace(/\n/g, '');
            if (!selection.isCollapsed() && rawTextContent === '') {
                setIsText(false);
            }
        });
    }, [editor]);

    useEffect(() => {
        document.addEventListener('selectionchange', updatePopup);
        return () => {
            document.removeEventListener('selectionchange', updatePopup);
        };
    }, [updatePopup]);

    useEffect(
        () =>
            mergeRegister(
                editor.registerUpdateListener(() => {
                    updatePopup();
                }),
                editor.registerRootListener(() => {
                    if (editor.getRootElement() === null) {
                        setIsText(false);
                    }
                }),
            ),
        [editor, updatePopup],
    );

    if (!isText) {
        return null;
    }

    return createPortal(
        <TextFormatFloatingToolbar
            align={align}
            anchorElem={anchorElem}
            editor={editor}
            isBold={isBold}
            isCode={isCode}
            isItalic={isItalic}
            isLink={isLink}
            isStrikethrough={isStrikethrough}
            isSubscript={isSubscript}
            isSuperscript={isSuperscript}
            isUnderline={isUnderline}
            setIsLinkEditMode={setIsLinkEditMode}
        />,
        anchorElem,
    );
}

export const FloatingTextFormatToolbarPlugin = ({
    anchorElem = document.body,
    setIsLinkEditMode,
}: {
    anchorElem?: HTMLElement;
    setIsLinkEditMode?: Dispatch<boolean>;
}): JSX.Element | null => {
    const [editor] = useLexicalComposerContext();
    return useFloatingTextFormatToolbar(editor, anchorElem, setIsLinkEditMode);
};
