import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ComponentPickerMenu.module.scss';
import { ComponentPickerOption } from './ComponentPickerOption';

export interface ComponentPickerMenuItemProps {
    index: number;
    isSelected: boolean;
    onClick: () => void;
    onMouseEnter: () => void;
    option: ComponentPickerOption;
}

export const ComponentPickerMenuItem = (props: ComponentPickerMenuItemProps) => {
    const { index, isSelected, onClick, onMouseEnter, option } = props;

    return (
        <li
            aria-selected={isSelected}
            className={classNames(cls.item, { [cls.selected]: isSelected }, [])}
            id={`typeahead-item-${index}`}
            key={option.key}
            ref={option.setRefElement}
            role="option"
            tabIndex={-1}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
        >
            {option.icon}
            <span className={cls.text}>{option.title}</span>
        </li>
    );
};
