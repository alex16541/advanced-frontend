import { EditorChildren, FormattingStyle, ParagraphChildren, Position } from '../model/types';

export const isRootNode = (node: any) =>
    node instanceof HTMLDivElement && node.classList.contains('editor-root');
export const isTextNode = (node: any): node is Text => node instanceof Text;
export const isSpanNode = (node: any): node is HTMLSpanElement => node instanceof HTMLSpanElement;
export const isParagraphNode = (node: any): node is HTMLParagraphElement =>
    node instanceof HTMLParagraphElement;
export const isAllNodesIsParagraphChild = (childrens: Node[]): childrens is ParagraphChildren[] =>
    childrens.every((child) => isTextNode(child) || isSpanNode(child));

export function getChildNodesArray(node: Node | null | undefined) {
    return Array.from(node?.childNodes ?? []);
}

export function getSelection() {
    const range = window.getSelection()?.getRangeAt(0);
    const documentFragment = range?.cloneContents();
    const childrenList = documentFragment?.childNodes;
    const root = range?.commonAncestorContainer;

    return { range, documentFragment, childrenList, root };
}

export function makeSelection(from: Node, to: Node) {
    const newRange = document.createRange();

    newRange.setStartBefore(from);
    newRange.setEndAfter(to);

    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(newRange);
}

export function addSurroundSpan(range: Range) {
    const span = document.createElement('span');
    range?.surroundContents(span);
    return span;
}

export function unwrapSpanWithoutClass(span: HTMLSpanElement) {
    if (span.classList.toString().trim() === '') {
        const textNode = document.createTextNode(span.innerText);
        return textNode;
    }

    return span;
}

export function createElementWithContent(tag: keyof HTMLElementTagNameMap, childrens: Node[]) {
    const el = document.createElement(tag);
    el.append(...childrens);
    return el;
}

export function isParagraphChildrenFormatedBy(style: FormattingStyle, child: ParagraphChildren) {
    if (isTextNode(child)) {
        return child.textContent === '';
    }
    return isSpanNode(child) && child.classList.contains(style);
}

export function joinSpansByClass(spans: HTMLSpanElement[]) {
    const res: HTMLSpanElement[] = [];

    let prev = spans[0];

    spans.forEach((cur) => {
        if (cur.classList.toString() === prev.classList.toString()) {
            prev.append(document.createTextNode(cur.textContent ?? ''));
        } else {
            res.push(prev);
            prev = cur;
        }
    });

    res.push(prev);

    return res;
}

export function removeIfEmptySpan(node: Node | null) {
    if (!node || !isSpanNode(node)) return;

    const text = node.innerText;

    if (text === '') node.remove();
}

export function trimEmptySpanSidlings(nodes: ParagraphChildren[]) {
    const firstSpan = nodes[0]?.previousSibling;
    const lastSpan = nodes[nodes.length - 1]?.nextSibling;

    removeIfEmptySpan(firstSpan);
    removeIfEmptySpan(lastSpan);
}

export function getNodePosition(node: Node | null) {
    const res: Position = { paragraph: null, span: null };

    if (!node) return res;

    const parent = node.parentNode;

    if (isTextNode(node) && parent) {
        if (isSpanNode(parent)) {
            res.span = parent;
            if (res.span.parentNode && isParagraphNode(res.span.parentNode))
                res.paragraph = res.span.parentNode;
        } else if (isParagraphNode(parent)) res.paragraph = parent;
    } else if (isSpanNode(node)) {
        res.span = node;
        if (parent && isParagraphNode(parent)) res.paragraph = parent;
    } else if (isParagraphNode(node)) {
        res.paragraph = node;
    }

    return res;
}

export function getTextNodeOffset(textNode: Node | Text, offset: number = 0) {
    if (!textNode.parentNode) return 0;

    const { parentNode } = textNode;
    const childrens = Array.from(parentNode.childNodes);

    let res = 0;

    for (let i = 0; i < childrens.length; i++) {
        const child = childrens[i];

        if (child === textNode) {
            res += offset;
            break;
        } else {
            res += child.textContent?.length ?? 0;
        }
    }

    return res;
}

export function getParagraphs(selection: Selection | null) {
    const range = selection?.getRangeAt(0);

    const startParagraph = getNodePosition(range?.startContainer ?? null);
    const endParagraph = getNodePosition(range?.endContainer ?? null);

    const paragraphs = [startParagraph.paragraph];

    if (startParagraph.paragraph === endParagraph.paragraph) {
        return paragraphs;
    }

    for (let i = 0; i < paragraphs.length; i++) {
        const nextParagraph = paragraphs[i]?.nextSibling;
        if (!nextParagraph || nextParagraph === endParagraph.paragraph) {
            break;
        }

        paragraphs.push(nextParagraph as HTMLParagraphElement);
    }

    paragraphs.push(endParagraph.paragraph);

    return paragraphs;
}

export function convertParagraphChildrenToSpan(el: ParagraphChildren): Exclude<ParagraphChildren, Text> {
    if (isTextNode(el)) {
        return createElementWithContent('span', [el]);
    }

    return el as Exclude<ParagraphChildren, Text>;
}

export function shouldRemoveFormatting(childrens: ParagraphChildren[], style: FormattingStyle) {
    return childrens.every((child) => isParagraphChildrenFormatedBy(style, child));
}

export function shouldRemoveFormattingFromParagraph(p: HTMLParagraphElement, style: FormattingStyle) {
    const childrens = getChildNodesArray(p) as ParagraphChildren[];
    return childrens.every((child) => isParagraphChildrenFormatedBy(style, child));
}

export function removeParagraphChildrensFormatting(childrens: ParagraphChildren[], style: FormattingStyle) {
    const spans: HTMLSpanElement[] = childrens.map(convertParagraphChildrenToSpan).map((span) => {
        span.classList.remove(style);
        return span;
    });

    const joinedSpans = joinSpansByClass(spans);

    const spansAndTextNodes = joinedSpans.map(unwrapSpanWithoutClass);

    return spansAndTextNodes;
}

export function removeParagraphFormatting(p: HTMLParagraphElement, style: FormattingStyle) {
    const childrens = getChildNodesArray(p);

    if (isAllNodesIsParagraphChild(childrens)) {
        const formatedChildrens = removeParagraphChildrensFormatting(childrens, style);

        return createElementWithContent('p', formatedChildrens) as HTMLParagraphElement;
    }

    return p;
}

export function joinParagraph(paragraph: HTMLParagraphElement, sidling: 'prev' | 'next' = 'prev') {
    const paragraphSidling = sidling === 'prev' ? paragraph.previousSibling : paragraph.nextSibling;

    const sidlingChildrens = Array.from(paragraphSidling?.childNodes ?? []);

    if (sidlingChildrens && sidling === 'prev') {
        paragraph.prepend(...sidlingChildrens);
    } else {
        paragraph.append(...sidlingChildrens);
    }

    paragraphSidling?.remove();
}

export function joinCutedParagraphs(paragraphs: HTMLParagraphElement[]) {
    const firstParagraph = paragraphs[0];
    const lastParagraph = paragraphs[paragraphs.length - 1];

    joinParagraph(firstParagraph);
    joinParagraph(lastParagraph, 'next');
}

export function getSelectionAroundParagraphs(paragraphs: HTMLParagraphElement[]) {
    const firstParagraph = paragraphs[0];
    const lastParagraph = paragraphs[paragraphs.length - 1];

    const selectionStart = firstParagraph.firstChild ?? null;
    const selectionEnd = lastParagraph.lastChild ?? null;

    return [selectionStart, selectionEnd];
}

export function cutSpanText(range: Range, position: Position) {
    const selectedText = range?.toString() ?? '';
    const { paragraph, span } = position;

    if (!span || !paragraph) return null;

    const startOffset = getTextNodeOffset(range.startContainer) + range.startOffset;
    const endOffset = getTextNodeOffset(range.endContainer) + range.endOffset;

    const textBefore = span.textContent?.slice(0, startOffset) ?? '';
    const textAfter = span.textContent?.slice(endOffset) ?? '';

    const spanBefore = document.createElement('span');
    const spanAfter = document.createElement('span');
    const spanWithCutedText = document.createElement('span');

    const textNodeBefore = document.createTextNode(textBefore);
    const textNodeAfter = document.createTextNode(textAfter);
    const selectedTextNode = document.createTextNode(selectedText);

    const defaultStyles = span.classList.toString().split(' ');

    spanBefore.appendChild(textNodeBefore);
    spanAfter.appendChild(textNodeAfter);
    spanWithCutedText.appendChild(selectedTextNode);

    defaultStyles.forEach((s) => {
        spanBefore.classList.add(s);
        spanAfter.classList.add(s);
        spanWithCutedText.classList.add(s);
    });

    if (textBefore) paragraph.insertBefore(spanBefore, span);

    paragraph.insertBefore(spanWithCutedText, span);

    if (textAfter) paragraph.insertBefore(spanAfter, span);

    span.remove();

    return spanWithCutedText;
}

export function removeFormattingInSpan(range: Range, position: Position) {
    const selectedText = range?.toString() ?? '';
    const { paragraph, span } = position;

    if (!span || !paragraph) return null;

    const startOffset = getTextNodeOffset(range.startContainer) + range.startOffset;
    const endOffset = getTextNodeOffset(range.endContainer) + range.endOffset;

    const textBefore = span.textContent?.slice(0, startOffset) ?? '';
    const textAfter = span.textContent?.slice(endOffset) ?? '';

    const spanBefore = document.createElement('span');
    const spanAfter = document.createElement('span');

    const textNodeBefore = document.createTextNode(textBefore);
    const textNodeAfter = document.createTextNode(textAfter);
    const selectedTextNode = document.createTextNode(selectedText);

    const defaultStyles = span.classList.toString().split(' ');

    spanBefore.appendChild(textNodeBefore);
    spanAfter.appendChild(textNodeAfter);

    defaultStyles.forEach((s) => {
        spanBefore.classList.add(s);
        spanAfter.classList.add(s);
    });

    if (textBefore) paragraph.insertBefore(spanBefore, span);

    paragraph.insertBefore(selectedTextNode, span);

    if (textAfter) paragraph.insertBefore(spanAfter, span);

    span.remove();

    return selectedTextNode;
}

export function getPrevSidlings(node: Node) {
    const sidlings = [];
    let sidling = node.previousSibling;

    while (sidling) {
        sidlings.push(sidling);
        sidling = sidling.previousSibling;
    }

    sidlings.reverse();

    return sidlings;
}

export function getNextSidlings(node: Node) {
    const sidlings = [];
    let sidling = node.nextSibling;

    while (sidling) {
        sidlings.push(sidling);
        sidling = sidling.nextSibling;
    }

    return sidlings;
}
export function cutSelection() {
    const { range } = getSelection();

    if (!range) return null;

    const anchore = document.createElement('span');

    const startSelectionPosition = getNodePosition(range?.startContainer ?? null);
    const endSelectionPosition = getNodePosition(range?.endContainer ?? null);

    // 3 случая:

    // 1. Выделение внутри span
    const isSelectionInsideSpan =
        startSelectionPosition.span && startSelectionPosition.span === endSelectionPosition.span;

    if (isSelectionInsideSpan) {
        const selectedTextWrappedInSpan = cutSpanText(range, startSelectionPosition);
        if (!selectedTextWrappedInSpan) return null;

        range.setStartBefore(selectedTextWrappedInSpan);
        range.setEndAfter(selectedTextWrappedInSpan);
    }

    const selectedContent = range.cloneContents();
    const selectedChildrens = Array.from(selectedContent.childNodes ?? []) as EditorChildren[];

    const start: ParagraphChildren[] = [];
    const end: ParagraphChildren[] = [];
    const content: EditorChildren[] = [];

    // 2. выделение внутри параграфа
    const isSelectionInsideParagraph = selectedChildrens.find((n) => isTextNode(n) || isSpanNode(n));
    if (isSelectionInsideParagraph) {
        const position = getNodePosition(range?.startContainer ?? null);

        range.deleteContents();
        range.insertNode(anchore);

        const startChildrens = getPrevSidlings(anchore) as ParagraphChildren[];
        const endChildrens = getNextSidlings(anchore) as ParagraphChildren[];
        const contentParagraph = createElementWithContent('p', selectedChildrens) as HTMLParagraphElement;

        start.push(...startChildrens);
        end.push(...endChildrens);
        content.push(contentParagraph);

        position.paragraph?.remove();

        return { start, content, end, range };
    }

    // 3. выделение вокруг параграфов
    const isSelectionAroundParagraph = selectedChildrens.find((n) => isParagraphNode(n));
    if (isSelectionAroundParagraph) {
        const isSelectionStartsInParagraph =
            isTextNode(range.startContainer) || isSpanNode(range.startContainer);
        const isSelectionEndsInParagraph = isTextNode(range.endContainer) || isSpanNode(range.endContainer);

        range.deleteContents();
        range.insertNode(anchore);

        if (isSelectionStartsInParagraph) {
            const prevParagraph = anchore.previousSibling;
            const startChildrens = getChildNodesArray(prevParagraph) as ParagraphChildren[];
            start.push(...startChildrens);
            prevParagraph?.remove();
        }

        if (isSelectionEndsInParagraph) {
            const nextParagraph = anchore.nextSibling;
            const endChildrens = getChildNodesArray(nextParagraph) as ParagraphChildren[];
            end.push(...endChildrens);
            nextParagraph?.remove();
        }

        content.push(...selectedChildrens);

        range.deleteContents();

        return { start, content, end, range };
    }

    return null;
}

export function formatParagraphChildrens(selectedChildrens: ParagraphChildren[], style: FormattingStyle) {
    const onlyTextNodes = selectedChildrens.every((el) => isTextNode(el));

    if (onlyTextNodes) {
        console.log('#1 all - text');

        const span = createElementWithContent('span', selectedChildrens);
        span.classList.add(style);

        return [span];
    }
    if (shouldRemoveFormatting(selectedChildrens, style)) {
        console.log('#2 remove formatting');

        return removeParagraphChildrensFormatting(selectedChildrens, style);
    }
    console.log('#3 add formatting');

    const spans: HTMLSpanElement[] = selectedChildrens.map(convertParagraphChildrenToSpan).map((span) => {
        if (!span.classList.contains(style)) span.classList.add(style);

        return span;
    });

    return joinSpansByClass(spans);
}

export function formatParagraph(p: HTMLParagraphElement, style: FormattingStyle) {
    const childrens = getChildNodesArray(p);

    if (isAllNodesIsParagraphChild(childrens)) {
        const formatedChildrens = formatParagraphChildrens(childrens, style);

        return createElementWithContent('p', formatedChildrens) as HTMLParagraphElement;
    }

    return p;
}

export function rangeInsert(range: Range, nodes: Node[]) {
    nodes.reverse();
    nodes.forEach((p) => range.insertNode(p));
    nodes.reverse();
}
