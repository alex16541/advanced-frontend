import { MutableRefObject, useCallback } from 'react';

import {
    createElementWithContent,
    cutSelection,
    formatParagraph,
    getNodePosition,
    getParagraphs,
    getSelection,
    getSelectionAroundParagraphs,
    isParagraphNode,
    isTextNode,
    joinCutedParagraphs,
    makeSelection,
    rangeInsert,
    removeFormattingInSpan,
    removeParagraphFormatting,
    shouldRemoveFormattingFromParagraph,
} from '../lib/editor';
import { EditorChildren, FormattingStyle, ParagraphChildren } from '../model/types';

interface UseTextEditorsProps {
    editorRef: MutableRefObject<HTMLDivElement | null>;
    setIsTextSelected?: (isSelected: boolean) => void;
}

export const useTextEditor = (props: UseTextEditorsProps) => {
    const { editorRef } = props;

    const onChangeBlockType = useCallback((blockType: any) => {
        editorRef.current?.focus();
        document.execCommand('formatBlock', false, blockType);
    }, []);

    const onResetSelectedTextStyles = useCallback(() => {
        const { range, childrenList, root } = getSelection();

        if (!childrenList || !root || !range) return;

        let selectionStart: null | Node = null;
        let selectionEnd: null | Node = null;

        const childrens = Array.from(childrenList) as EditorChildren[];
        if (childrens.every((el) => isTextNode(el))) {
            console.log('#1 all - text');

            const position = getNodePosition(root);
            const clearedNode = removeFormattingInSpan(range, position);
            selectionStart = clearedNode;
            selectionEnd = clearedNode;
        } else if (childrens.find((n) => isParagraphNode(n))) {
            console.log('#2 any paragraph');

            const domParagraphs = getParagraphs(document.getSelection());
            const copyedParagraphs = childrens;
            const formatedParagraphs: ParagraphChildren[][] = [];

            domParagraphs.forEach((node, i) => {
                if (isParagraphNode(node)) {
                    const copyedParagraph = copyedParagraphs[i];

                    const paragraphText = copyedParagraph.textContent ?? '';

                    formatedParagraphs.push([document.createTextNode(paragraphText)]);
                }
            });

            const paragraphs = formatedParagraphs.map((childrens) =>
                createElementWithContent('p', childrens),
            ) as HTMLParagraphElement[];

            range.deleteContents();

            rangeInsert(range, paragraphs);

            [selectionStart, selectionEnd] = getSelectionAroundParagraphs(paragraphs);

            joinCutedParagraphs(paragraphs);
        } else {
            const selectedText = range.toString();
            const clearText = document.createTextNode(selectedText);

            range.deleteContents();
            range.insertNode(clearText);

            selectionStart = clearText;
            selectionEnd = clearText;
        }

        if (selectionStart && selectionEnd) makeSelection(selectionStart, selectionEnd);
    }, []);

    const onSetSelectedTextStyle = useCallback((style: FormattingStyle) => {
        const cuttedSelection = cutSelection();

        if (!cuttedSelection) return;

        const { start, content: editorChildrens, end, range } = cuttedSelection;

        // 0. Определить добавляем ли мы форматирование или удаляем.
        const isShouldRemoveFormatting = editorChildrens
            .filter(isParagraphNode)
            .every((p) => shouldRemoveFormattingFromParagraph(p, style));

        // 1. Отформатировать параграфы в content'е
        const formattedContent: EditorChildren[] = [];

        for (const child of editorChildrens) {
            if (isParagraphNode(child)) {
                const formatedParagraph = isShouldRemoveFormatting
                    ? removeParagraphFormatting(child, style)
                    : formatParagraph(child, style);
                formattedContent.push(formatedParagraph);
            }
        }

        // 2. Вставить отформатированные параграфы
        rangeInsert(range, formattedContent);

        // 3. Сделать выделение на основании содержимого параграфов
        const firstParagraph = formattedContent[0];
        const lastParagraph = formattedContent[formattedContent.length - 1];
        const { firstChild } = firstParagraph;
        const { lastChild } = lastParagraph;

        if (firstChild && lastChild) {
            // 4. Добавить start и end
            firstParagraph.prepend(...start);
            lastParagraph.append(...end);

            makeSelection(firstChild, lastChild);
        }
    }, []);

    return { onSetSelectedTextStyle, onResetSelectedTextStyles, onChangeBlockType };
};
