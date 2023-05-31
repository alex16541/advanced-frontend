import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticlesList } from 'entity/Article';
import { Button, ButtonThemes } from 'shared/ui/Button';
import { Text } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import GridIcon from 'shared/assets/svg/grid.svg';
import LayoutListIcon from 'shared/assets/svg/layoutList.svg';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useOnInit } from 'shared/hooks/useOnInit';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import cls from './ArticlesPage.module.scss';
import { articlesPageReducer, articlesPageSelectors } from '../model/slices/articlesPageSlice';
import { fetchArticlesList } from '../model/services/fetchArticlesList';
import {
    selectArticlesPageErrors,
    selectArticlesPageIsLoading,
    selectArticlesPageView,
} from '../model/selectors/articlesPageSelectors';

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

interface ArticlesPageProps {
    className?: string;
}

const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props;
    const { t } = useTranslation('article');
    const dispatch = useAppDispatch();
    const articles = useSelector(articlesPageSelectors.selectAll);
    const isLoading = useSelector(selectArticlesPageIsLoading);
    const view = useSelector(selectArticlesPageView);
    const errors = useSelector(selectArticlesPageErrors);
    // const articles = new Array(9).fill(0).map((item, index) => ({
    //     ...article,
    //     id: index.toString(),
    // }));

    useOnInit(() => {
        dispatch(fetchArticlesList());
    });

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={classNames(cls.ArticlesPage, {}, [className])}>
                <div className={cls.header}>
                    <Text title={t('Article list')} />
                    <div className={cls.view_switch}>
                        <Button className={cls.button} theme={ButtonThemes.CLEAR}>
                            <GridIcon className={cls.icon} />
                        </Button>
                        <Button className={cls.button} theme={ButtonThemes.CLEAR}>
                            <LayoutListIcon className={cls.icon} />
                        </Button>
                    </div>
                </div>
                <ArticlesList view={view} articles={articles} isLoading={isLoading} />
            </div>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
