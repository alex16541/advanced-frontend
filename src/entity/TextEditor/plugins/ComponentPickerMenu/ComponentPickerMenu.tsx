import cls from './ComponentPickerMenu.module.scss';
import { ComponentPickerMenuItem, ComponentPickerMenuItemProps } from './ComponentPickerMenuItem';

interface ComponentPickerMenuProps {
    items: Array<ComponentPickerMenuItemProps>;
}

export const ComponentPickerMenu = (props: ComponentPickerMenuProps) => {
    const { items } = props;
    return (
        <div className={cls.componentPickerMenu}>
            <ul>
                {items.map((item) => (
                    <ComponentPickerMenuItem key={item.option.key} {...item} />
                ))}
            </ul>
        </div>
    );
};
