import {
    UseFloatingOptions,
    ReferenceType,
    useFloating,
    hide,
    shift,
    autoUpdate,
    useDismiss,
    useInteractions,
} from '@floating-ui/react';
import { useCallback } from 'react';

export interface UseEditorTextActionMenuProps {
    additionalFloatingOptions?: UseFloatingOptions<ReferenceType>;
    isOpen?: boolean;
    setIsOpen: (newValue?: boolean) => void;
}

export const useEditorTextActionMenu = (props: UseEditorTextActionMenuProps) => {
    const { additionalFloatingOptions = {}, setIsOpen, isOpen } = props;

    const { refs, floatingStyles, context, middlewareData } = useFloating({
        ...additionalFloatingOptions,
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: 'top-start',
        middleware: [hide(), shift({ crossAxis: true })],
        whileElementsMounted: autoUpdate,
    });

    const dismiss = useDismiss(context);

    const { getFloatingProps } = useInteractions([dismiss]);

    const setSelection = useCallback(
        (selection: Selection | null) => {
            const range =
                typeof selection?.rangeCount === 'number' && selection.rangeCount > 0
                    ? selection.getRangeAt(0)
                    : null;

            if (selection?.isCollapsed) {
                setIsOpen(false);
                return;
            }

            if (range) {
                refs.setReference({
                    getBoundingClientRect: () => range.getBoundingClientRect(),
                    getClientRects: () => range.getClientRects(),
                });
                setIsOpen(true);
            }
        },
        [refs, setIsOpen],
    );

    return {
        refs,
        floatingStyles,
        middlewareData,
        getFloatingProps,
        setSelection,
    };
};
