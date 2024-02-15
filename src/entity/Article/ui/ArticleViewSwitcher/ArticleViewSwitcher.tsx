import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Button, ButtonThemes } from 'shared/ui/Button';
import GridIcon from 'shared/assets/svg/grid.svg';
import LayoutListIcon from 'shared/assets/svg/layoutList.svg';
import { ArticlesListView } from '../..';
import cls from './ArticleViewSwitcher.module.scss';

interface ArticleViewSwitcherProps {
    className?: string;
    view: ArticlesListView;
    onViewSwitch: (view: ArticlesListView) => void;
}

const viewTypes = [
    {
        view: ArticlesListView.GRID,
        icon: GridIcon,
    },
    {
        view: ArticlesListView.LIST,
        icon: LayoutListIcon,
    },
];

export const ArticleViewSwitcher = memo((props: ArticleViewSwitcherProps) => {
    const { className, view, onViewSwitch } = props;

    const onViewSwitchHandler = (view: ArticlesListView) => () => {
        onViewSwitch(view);
    };

    return (
        <div className={classNames(cls.ArticleViewSwitcher, {}, [className])}>
            {viewTypes.map((viewType) => (
                <Button
                    key={viewType.view}
                    className={cls.button}
                    theme={ButtonThemes.CLEAR}
                    onClick={onViewSwitchHandler(viewType.view)}
                >
                    <viewType.icon className={classNames(cls.icon, { [cls.selected]: view === viewType.view })} />
                </Button>
            ))}
        </div>
    );
});
