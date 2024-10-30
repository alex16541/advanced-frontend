import { $isCodeNode, CODE_LANGUAGE_FRIENDLY_NAME_MAP, normalizeCodeLang } from '@lexical/code';
import { $getNearestNodeFromDOMNode, $getSelection, $setSelection, LexicalEditor } from 'lexical';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ListBoxOption } from '@/shared/ui/deprecated/Popups';
import { ListBox } from '@/shared/ui/redesigned/Popups';

import cls from './CodeActionMenuPlugin.module.scss';

interface Props {
    editor: LexicalEditor;
    getCodeDOMNode: () => HTMLElement | null;
    lang: string;
}

export function LanguageSelect({ editor, getCodeDOMNode, lang }: Props) {
    const [language, setLanguage] = useState(normalizeCodeLang(lang));
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {}, []);

    const onLanguageChange = useCallback(
        (value: string) => {
            const codeDOMNode = getCodeDOMNode();

            if (!codeDOMNode) {
                return;
            }

            editor.update(() => {
                const codeNode = $getNearestNodeFromDOMNode(codeDOMNode);

                if ($isCodeNode(codeNode)) {
                    codeNode.setLanguage(value);
                    setLanguage(value);
                }

                const selection = $getSelection();
                $setSelection(selection);
            });
        },
        [editor, getCodeDOMNode],
    );

    const options = useMemo<ListBoxOption<string>[]>(
        () =>
            Object.keys(CODE_LANGUAGE_FRIENDLY_NAME_MAP).map((key) => ({
                value: key,
                content: CODE_LANGUAGE_FRIENDLY_NAME_MAP[key],
            })),
        [],
    );

    return (
        <ListBox
            buttonAlign="Center"
            buttonVariant="clear"
            classNameButton={classNames(cls.Button, { [cls.Open]: isOpen }, [cls.LanguageSelectButton])}
            classNameOptions={cls.LanguageSelectOptions}
            classNameWrapper={cls.LanguageSelect}
            options={options}
            setIsOpen={(val: boolean) => setIsOpen(val)}
            showArrow={false}
            size="s"
            value={language}
            onChange={onLanguageChange}
            onMouseMove={(e) => {
                e.stopPropagation();
            }}
        />
    );
}
