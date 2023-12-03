import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useMemo } from 'react';
import { ArticleDetails, ArticlesList, ArticlesListView } from 'entity/Article';
import { useNavigate, useParams } from 'react-router-dom';
import { Text } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { ArticleCommentsList } from 'features/ArticleCommentsList';
import { Button } from 'shared/ui/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Page } from 'widgets/Page';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { SmallArticleCard } from 'entity/Article/ui/SmallArticleCard/SmallArticleCard';
import { useOnInit } from 'shared/hooks/useOnInit';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import cls from './ArticleDetailsPage.module.scss';
import {
    articleDetailsRecommendationsReducer,
    getArticleRecommendations,
} from '../model/slices/articleDetailsRecommendations';
import {
    selectArticleRecommendationsIsLoading,
    selectArticleRecommendationsError,
} from '../model/selectors/recommendations';
import { fetchArticleRecommendations } from '../model/services/fetchArticleRecommendations';

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleRecommendations: articleDetailsRecommendationsReducer,
};

const ArticleDetailsPage = memo((props: ArticleDetailsPageProps) => {
    const { className } = props;
    let { id } = useParams<{ id: string }>();
    const { t } = useTranslation('article');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isRecommendationsLoading = useAppSelector(selectArticleRecommendationsIsLoading);
    const recommendationsError = useAppSelector(selectArticleRecommendationsError);
    const recommendations = useAppSelector(getArticleRecommendations.selectAll);

    useOnInit(() => {
        dispatch(fetchArticleRecommendations());
    });

    const onBack = () => {
        navigate(RoutePath.articles);
    };

    if (__PROJECT__ === 'storybook') id = '1';

    if (!id) {
        return (
            <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                <Text title={t('article not found')} />
            </div>
        );
    }

    return (
        <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            <DynamicModuleLoader reducers={reducers} removeAfterUnmout={false}>
                <div className={cls.container}>
                    <header className={cls.header}>
                        <Button onClick={onBack}>{t('back')}</Button>
                    </header>
                    <ArticleDetails id={id} />
                    <div className={cls.recommendations}>
                        <Text title={t('recommendations')} />
                        <ArticlesList
                            target="_blank"
                            isLoading={isRecommendationsLoading}
                            articles={recommendations}
                            view={ArticlesListView.CARUSEL}
                        />
                    </div>
                    <ArticleCommentsList className={cls.comments__list} articleId={id} />
                </div>
            </DynamicModuleLoader>
        </Page>
    );
});

export default ArticleDetailsPage;
