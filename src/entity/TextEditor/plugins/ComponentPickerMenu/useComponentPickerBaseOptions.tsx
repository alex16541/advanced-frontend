import { $createCodeNode } from '@lexical/code';
import {
    INSERT_CHECK_LIST_COMMAND,
    INSERT_ORDERED_LIST_COMMAND,
    INSERT_UNORDERED_LIST_COMMAND,
} from '@lexical/list';
import { $createHeadingNode, $createQuoteNode } from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
// import { INSERT_TABLE_COMMAND } from '@lexical/table';
import {
    $createParagraphNode,
    $getSelection,
    $isRangeSelection,
    FORMAT_ELEMENT_COMMAND,
    LexicalEditor,
} from 'lexical';
import { ReactElement, useMemo } from 'react';

import AlignCenterIcon from '@/shared/assets/svg/awesome_icons/align-center-solid.svg';
import AlignJustifyIcon from '@/shared/assets/svg/awesome_icons/align-justify-solid.svg';
import AlignLeftIcon from '@/shared/assets/svg/awesome_icons/align-left-solid.svg';
import AlignRightIcon from '@/shared/assets/svg/awesome_icons/align-right-solid.svg';
import CodeIcon from '@/shared/assets/svg/awesome_icons/code-solid.svg';
// import HeadingIcon from '@/shared/assets/svg/awesome_icons/heading-solid.svg';
import ImageIcon from '@/shared/assets/svg/awesome_icons/image-solid.svg';
import CheckListIcon from '@/shared/assets/svg/awesome_icons/list-check-solid.svg';
import NumberedListIcon from '@/shared/assets/svg/awesome_icons/list-ol-solid.svg';
import BulletedListIcon from '@/shared/assets/svg/awesome_icons/list-ul-solid.svg';
import ParagraphIcon from '@/shared/assets/svg/awesome_icons/paragraph-solid.svg';
import QuoteIcon from '@/shared/assets/svg/awesome_icons/quote-left-solid.svg';
import Heading1Icon from '@/shared/assets/svg/bootstrap_icons/type-h1.svg';
import Heading2Icon from '@/shared/assets/svg/bootstrap_icons/type-h2.svg';
import Heading3Icon from '@/shared/assets/svg/bootstrap_icons/type-h3.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';

import { InsertImageDialog } from '../ImagesPlugin/ImagesPlugin';

import cls from './ComponentPickerMenu.module.scss';
import { ComponentPickerOption } from './ComponentPickerOption';

export type ComponentPickerOptionType =
    | 'image'
    | 'paragraph'
    | 'heading'
    | 'code'
    | 'quote'
    | 'checkList'
    | 'numberedList'
    | 'bulletedList'
    | 'align';

const AlignIcons = {
    left: AlignLeftIcon,
    center: AlignCenterIcon,
    right: AlignRightIcon,
    justify: AlignJustifyIcon,
};

const HeaderMap = {
    2: Heading1Icon,
    3: Heading2Icon,
    4: Heading3Icon,
};

export function useComponentPickerOptions(
    editor: LexicalEditor,
    showModal: (fn: (onClose: () => void) => ReactElement) => void,
    queryString: string | null,
    // eslint-disable-next-line max-len
    optionTypes: ComponentPickerOptionType[] = [
        'image',
        'paragraph',
        'heading',
        'code',
        'quote',
        'checkList',
        'numberedList',
        'bulletedList',
        'align',
    ],
) {
    const baseOptions = useMemo(
        () => [
            new ComponentPickerOption('Paragraph', {
                icon: <Icon className={cls.icon} Svg={ParagraphIcon} />,
                keywords: ['normal', 'paragraph', 'p', 'text'],
                onSelect: () =>
                    editor.update(() => {
                        const selection = $getSelection();
                        if ($isRangeSelection(selection)) {
                            $setBlocksType(selection, () => $createParagraphNode());
                        }
                    }),
                type: 'paragraph',
            }),
            ...([2, 3, 4] as const).map(
                (n) =>
                    new ComponentPickerOption(`Heading ${n - 1}`, {
                        icon: <Icon className={cls.icon} Svg={HeaderMap[n]} />,
                        keywords: ['heading', 'header', `h${n - 1}`],
                        onSelect: () =>
                            editor.update(() => {
                                const selection = $getSelection();
                                if ($isRangeSelection(selection)) {
                                    $setBlocksType(selection, () => $createHeadingNode(`h${n}`));
                                }
                            }),
                        type: 'heading',
                    }),
            ),
            new ComponentPickerOption('Numbered List', {
                icon: <Icon className={cls.icon} Svg={NumberedListIcon} />,
                keywords: ['numbered list', 'ordered list', 'ol'],
                onSelect: () => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined),
                type: 'numberedList',
            }),
            new ComponentPickerOption('Bulleted List', {
                icon: <Icon className={cls.icon} Svg={BulletedListIcon} />,
                keywords: ['bulleted list', 'unordered list', 'ul'],
                onSelect: () => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined),
                type: 'bulletedList',
            }),
            new ComponentPickerOption('Check List', {
                icon: <Icon className={cls.icon} Svg={CheckListIcon} />,
                keywords: ['check list', 'todo list'],
                onSelect: () => editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined),
                type: 'checkList',
            }),
            new ComponentPickerOption('Image', {
                icon: <Icon className={cls.icon} Svg={ImageIcon} />,
                keywords: ['image', 'photo', 'picture', 'file'],
                onSelect: () =>
                    showModal((onClose: () => void) => (
                        <InsertImageDialog activeEditor={editor} onClose={onClose} />
                    )),
                type: 'image',
            }),
            new ComponentPickerOption('Quote', {
                icon: <Icon className={cls.icon} Svg={QuoteIcon} />,
                keywords: ['block quote'],
                onSelect: () =>
                    editor.update(() => {
                        const selection = $getSelection();
                        if ($isRangeSelection(selection)) {
                            $setBlocksType(selection, () => $createQuoteNode());
                        }
                    }),
                type: 'quote',
            }),
            new ComponentPickerOption('Code', {
                icon: <Icon className={cls.icon} Svg={CodeIcon} />,
                keywords: ['javascript', 'python', 'js', 'codeblock'],
                onSelect: () =>
                    editor.update(() => {
                        const selection = $getSelection();

                        if ($isRangeSelection(selection)) {
                            if (selection.isCollapsed()) {
                                $setBlocksType(selection, () => $createCodeNode());
                            } else {
                                // Will this ever happen?
                                const textContent = selection.getTextContent();
                                const codeNode = $createCodeNode();
                                selection.insertNodes([codeNode]);
                                selection.insertRawText(textContent);
                            }
                        }
                    }),
                type: 'code',
            }),
            ...(['left', 'center', 'right', 'justify'] as const).map(
                (alignment) =>
                    new ComponentPickerOption(`Align ${alignment}`, {
                        icon: <Icon className={cls.icon} Svg={AlignIcons[alignment]} />,
                        keywords: ['align', 'justify', alignment],
                        onSelect: () => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, alignment),
                        type: 'align',
                    }),
            ),
        ],
        [editor, showModal],
    );

    const enabledOptions = useMemo(() => {
        const types: Set<ComponentPickerOptionType> = new Set(optionTypes);
        return baseOptions.filter((option) => types.has(option.type));
    }, [baseOptions, optionTypes]);

    const options = useMemo(() => {
        if (!queryString) {
            return enabledOptions;
        }

        const regex = new RegExp(queryString, 'i');

        return [
            // ...dynamicOptions,
            ...enabledOptions.filter(
                (option) =>
                    regex.test(option.title) || option.keywords.some((keyword) => regex.test(keyword)),
            ),
        ];
    }, [enabledOptions, queryString]);

    return { options };
}
