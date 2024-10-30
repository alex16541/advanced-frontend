import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
    LexicalTypeaheadMenuPlugin,
    MenuRenderFn,
    useBasicTypeaheadTriggerMatch,
} from '@lexical/react/LexicalTypeaheadMenuPlugin';
import { TextNode } from 'lexical';
import { ReactElement, useCallback, useState } from 'react';
import * as ReactDOM from 'react-dom';

import { Modal } from '@/shared/ui/redesigned/Modal';

import { ComponentPickerMenu } from '../ComponentPickerMenu/ComponentPickerMenu';
import { ComponentPickerMenuItemProps } from '../ComponentPickerMenu/ComponentPickerMenuItem';
import { ComponentPickerOption } from '../ComponentPickerMenu/ComponentPickerOption';
import {
    ComponentPickerOptionType,
    useComponentPickerOptions,
} from '../ComponentPickerMenu/useComponentPickerBaseOptions';

interface RenderMenuProps {
    selectedIndex: number | null;
    selectOptionAndCleanUp: (option: ComponentPickerOption) => void;
    setHighlightedIndex: (index: number) => void;
    options: Array<ComponentPickerOption>;
}

interface ComponentPickerPluginProps {
    options?: ComponentPickerOptionType[];
}

export const ComponentPickerMenuPlugin = (props: ComponentPickerPluginProps) => {
    const { options: optionTypes } = props;
    const [editor] = useLexicalComposerContext();
    const [queryString, setQueryString] = useState<string | null>(null);
    const [modalContent, setModalContent] = useState<ReactElement | null>(null);

    const showModal = (createModalBody: (onClose: () => void) => ReactElement) => {
        const onClose = () => {
            setModalContent(null);
        };

        setModalContent(createModalBody(onClose));
    };

    const { options } = useComponentPickerOptions(editor, showModal, queryString, optionTypes);

    const checkForTriggerMatch = useBasicTypeaheadTriggerMatch('/', {
        minLength: 0,
    });

    const onSelectOption = useCallback(
        (
            selectedOption: ComponentPickerOption,
            nodeToRemove: TextNode | null,
            closeMenu: () => void,
            matchingString: string,
        ) => {
            editor.update(() => {
                nodeToRemove?.remove();
                selectedOption.onSelect(matchingString);
                closeMenu();
            });
        },
        [editor],
    );

    const menuItems = useCallback(
        ({
            selectedIndex,
            selectOptionAndCleanUp,
            setHighlightedIndex,
        }: RenderMenuProps): Array<ComponentPickerMenuItemProps> =>
            options.map((option, i) => ({
                isSelected: selectedIndex === i,
                option,
                index: i,
                onClick: () => {
                    setHighlightedIndex(i);
                    selectOptionAndCleanUp(option);
                },
                onMouseEnter: () => {
                    setHighlightedIndex(i);
                },
            })),
        [options],
    );

    const renderMenu = useCallback<MenuRenderFn<ComponentPickerOption>>(
        (anchorElementRef, itemProps) =>
            anchorElementRef.current && options.length
                ? ReactDOM.createPortal(
                      <ComponentPickerMenu items={menuItems(itemProps)} />,
                      anchorElementRef.current,
                  )
                : null,
        [menuItems, options],
    );

    return (
        <>
            <Modal isOpen={Boolean(modalContent)} onClose={() => setModalContent(null)}>
                {modalContent}
            </Modal>
            <LexicalTypeaheadMenuPlugin<ComponentPickerOption>
                menuRenderFn={renderMenu}
                options={options}
                triggerFn={checkForTriggerMatch}
                onQueryChange={setQueryString}
                onSelectOption={onSelectOption}
            />
        </>
    );
};
