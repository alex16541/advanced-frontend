import { memo } from 'react';

import { ArticlesListView } from '@/entity/Article';
import GridIcon from '@/shared/assets/svg/grid.svg';
import LayoutListIcon from '@/shared/assets/svg/layoutList.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { FeatureToggle } from '@/shared/lib/features/FeatureToggle/FeatureToggle';
import {
    Button as ButtonDeprecated,
    ButtonThemes as ButtonThemesDeprecated,
} from '@/shared/ui/deprecated/Button';
import { Icon } from '@/shared/ui/redesigned/Icon';

import cls from './ArticleViewSwitcher.module.scss';

interface ArticleViewSwitcherProps {
    className?: string;
    view: ArticlesListView;
    onViewSwitch: (view: ArticlesListView) => void;
}

const viewTypes = [
    {
        view: ArticlesListView.LIST,
        icon: LayoutListIcon,
    },
    {
        view: ArticlesListView.GRID,
        icon: GridIcon,
    },
];

export const ArticleViewSwitcher = memo((props: ArticleViewSwitcherProps) => {
    const { className, view, onViewSwitch } = props;

    const onViewSwitchHandler = (view: ArticlesListView) => () => {
        onViewSwitch(view);
    };

    return (
        <FeatureToggle
            feature="isRedesignedApp"
            off={
                <div className={classNames(cls.ArticleViewSwitcher, {}, [className])}>
                    {viewTypes.map((viewType) => (
                        <ButtonDeprecated
                            className={cls.button}
                            key={viewType.view}
                            theme={ButtonThemesDeprecated.CLEAR}
                            onClick={onViewSwitchHandler(viewType.view)}
                        >
                            <viewType.icon
                                className={classNames(cls.icon, { [cls.selected]: view === viewType.view })}
                            />
                        </ButtonDeprecated>
                    ))}
                </div>
            }
            on={
                <div className={classNames(cls.ArticleViewSwitcherRedesigned, {}, [className])}>
                    {viewTypes.map((viewType) => (
                        <Icon
                            className={classNames(cls.button, { [cls.selected]: view === viewType.view })}
                            key={viewType.view}
                            Svg={viewType.icon}
                            clickable
                            onClick={onViewSwitchHandler(viewType.view)}
                        />
                    ))}
                </div>
            }
        />
    );
});
