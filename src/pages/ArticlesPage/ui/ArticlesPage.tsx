import { memo, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticlesList, ArticlesListView } from 'entity/Article';
import { Button, ButtonThemes } from 'shared/ui/Button';
import { Text } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import GridIcon from 'shared/assets/svg/grid.svg';
import LayoutListIcon from 'shared/assets/svg/layoutList.svg';
import { article } from 'entity/Article/mock/data';
import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
    className?: string;
}

const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props;
    const [view, setView] = useState(ArticlesListView.LIST);
    const { t } = useTranslation('article');
    const articles = new Array(view === ArticlesListView.GRID ? 9 : 3).fill(article);

    return (
        <div className={classNames(cls.ArticlesPage, {}, [className])}>
            <div className={cls.header}>
                <Text title={t('Article list')} />
                <div className={cls.view_switch}>
                    <Button
                        onClick={() => setView(ArticlesListView.GRID)}
                        className={cls.button}
                        theme={ButtonThemes.CLEAR}
                    >
                        <GridIcon className={cls.icon} />
                    </Button>
                    <Button
                        onClick={() => setView(ArticlesListView.LIST)}
                        className={cls.button}
                        theme={ButtonThemes.CLEAR}
                    >
                        <LayoutListIcon className={cls.icon} />
                    </Button>
                </div>
            </div>
            <ArticlesList view={view} articles={articles} />
        </div>
    );
};

export default memo(ArticlesPage);
