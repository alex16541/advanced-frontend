import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
    $createRangeSelection,
    $getNearestNodeFromDOMNode,
    $getSelection,
    $isRangeSelection,
    $setSelection,
} from 'lexical';
import { useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import PlusIcon from '@/shared/assets/svg/awesome_icons/plus-solid.svg';
import DragIcon from '@/shared/assets/svg/draggable-block-menu.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '@/shared/ui/redesigned/Icon';

import cls from './FloattingActionsMenu.module.scss';
import { useDraggableBlockMenu } from './useDraggableBlockMenu';

const DRAGGABLE_BLOCK_MENU_CLASSNAME = 'DraggableBlockMenu';

function isOnMenu(element: HTMLElement): boolean {
    return !!element.closest(`.${DRAGGABLE_BLOCK_MENU_CLASSNAME}`);
}

interface DraggableBlockPluginProps {
    anchorElem?: HTMLElement;
}

export const DraggableBlockPlugin = (props: DraggableBlockPluginProps) => {
    const { anchorElem = document.body } = props;
    const [editor] = useLexicalComposerContext();
    const menuRef = useRef<HTMLDivElement>(null);
    const targetLineRef = useRef<HTMLDivElement>(null);
    const [elementBlock, setElementBlock] = useState<HTMLElement | null>(null);

    const TargetLineComponent = <div className={cls.TargetLine} ref={targetLineRef} />;

    const { onDragStart, onDragEnd } = useDraggableBlockMenu(
        editor,
        anchorElem,
        menuRef,
        targetLineRef,
        isOnMenu,
        setElementBlock,
    );

    const onAddClick = useCallback(
        (e: React.MouseEvent) => {
            editor.update(() => {
                if (elementBlock) {
                    const node = $getNearestNodeFromDOMNode(elementBlock);
                    if (node) {
                        node.selectEnd();

                        const selection = $getSelection();

                        if (selection && $isRangeSelection(selection)) {
                            selection.insertParagraph();
                            selection.insertText('/');
                        }
                    }
                }
            });
        },
        [editor, elementBlock],
    );

    const onDragClick = useCallback(() => {
        if (elementBlock) {
            editor.update(() => {
                const rng = document.createRange();
                rng.selectNode(elementBlock);
                const rangeSelection = $createRangeSelection();
                rangeSelection.applyDOMRange(rng);
                $setSelection(rangeSelection);
            });
        }
    }, [editor, elementBlock]);

    return createPortal(
        <>
            <div>
                {editor._editable && (
                    <div className={cls.DraggableBlockMenu} ref={menuRef}>
                        <Icon
                            className={classNames(cls.item, {}, [cls.itemAdd])}
                            Svg={PlusIcon}
                            clickable
                            onClick={onAddClick}
                        />
                        <div className={cls.item} draggable onDragEnd={onDragEnd} onDragStart={onDragStart}>
                            <Icon className={cls.itemDrag} Svg={DragIcon} clickable onClick={onDragClick} />
                        </div>
                    </div>
                )}
            </div>
            {TargetLineComponent}
        </>,
        anchorElem,
    );
};
