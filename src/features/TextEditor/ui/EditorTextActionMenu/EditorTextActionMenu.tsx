import { CSSProperties, forwardRef, HTMLAttributes, useMemo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/redesigned/Button';
import { HStack } from '@/shared/ui/redesigned/Stack';

import cls from './EditorTextActionMenu.module.scss';

interface EditorTextActionMenuProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    isVisible?: boolean;
    isHidden?: boolean;
    styles: CSSProperties;
    floatingProps: HTMLAttributes<HTMLDivElement>;
    onChangeBlockType: (blockType: any) => void;
    onResetFormatting: () => void;
    onApplyStyle: (style: 'underline' | 'bold' | 'italic' | 'strikeThrough') => void;
}
export const EditorTextActionMenu = forwardRef<HTMLDivElement, EditorTextActionMenuProps>((props, ref) => {
    const {
        className,
        isVisible = false,
        isHidden = false,
        floatingProps,
        styles,
        onChangeBlockType,
        onApplyStyle,
onResetFormatting,
    } = props;

    const formatterButtons = useMemo(
        () => [
            {
                label: 'H',
                className: cls.header,
                onClick: () => onChangeBlockType('h3'),
            },
            {
                label: 'P',
                className: cls.paragraph,
                onClick: () => onChangeBlockType('p'),
            },
            {
                label: 'divider',
                className: cls.divider,
            },
            {
                label: 'B',
                className: cls.bold,
                onClick: () => onApplyStyle('bold'),
            },
            {
                label: 'I',
                className: cls.italic,
                onClick: () => onApplyStyle('italic'),
            },
            {
                label: 'U',
                className: cls.underline,
                onClick: () => onApplyStyle('underline'),
            },
            {
                label: 'X',
                className: cls.bold,
                onClick: () => onResetFormatting(),
            },
        ],
        [onChangeBlockType, onApplyStyle],
    );

    if (!isVisible) return null;

    return (
        <div
            className={classNames(cls.popup, {}, [className])}
            ref={ref}
            style={{
                ...styles,
                visibility: isHidden ? 'hidden' : 'visible',
            }}
            {...floatingProps}
        >
            <HStack className={cls.menu}>
                {formatterButtons.map((button) => {
                    if (button.label === 'divider')
                        return <span className={cls.divider} key={button.label} />;

                    return (
                        <Button
                            className={button.className}
                            disabled={!isVisible}
                            key={button.label}
                            theme="clear"
                            type="button"
                            onClick={button.onClick}
                        >
                            {button.label}
                        </Button>
                    );
                })}
            </HStack>
        </div>
    );
});
