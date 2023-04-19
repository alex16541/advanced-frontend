import { classNames } from 'shared/lib/classNames/classNames';
import {
    memo, ReactElement, useCallback, useEffect,
} from 'react';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { PageLoader } from 'widgets/PageLoader';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { Skeleton } from 'shared/ui/Skeleton';
import { articleDetailsReducer } from '../../model/slices/articleDetailsSlice';
import cls from './ArticleDetails.module.scss';
import { fetchArticleById } from '../../model/services/getArticleById/fetchArticleById';
import {
    getArticleDetailsData,
    getArticleDetailsErrors,
    getArticleDetailsIsLoading,
} from '../../model/selectors/getArticleDetails';

interface ArticleDetailsProps {
    className?: string;
    id: string;
}

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { className, id } = props;

    const dispatch = useAppDispatch();

    const article = useSelector(getArticleDetailsData);
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const errors = useSelector(getArticleDetailsErrors);
    const { t } = useTranslation('article');

    const fetchArticle = useCallback(
        async (id: string) => {
            const result = await dispatch(fetchArticleById(id));

            // if (result.meta.requestStatus === 'fulfilled') {
            // }
        },
        [dispatch],
    );

    const getArticle = () => {};

    useEffect(() => {
        if (id) {
            fetchArticle(id);
        }
    }, [dispatch, fetchArticle, id]);

    let content!: ReactElement<any, any>;

    if (isLoading) {
        content = (
            <div className={cls.loaderColumn}>
                <div className={cls.loaderRow}>
                    <Skeleton width={100} height={100} />
                    <div className={cls.loaderColumn}>
                        <Skeleton width={230} height={20} />
                        <Skeleton width={170} height={20} />
                        <Skeleton width="100%" height={40} />
                    </div>
                </div>
                <Skeleton width={300} height={50} />
                <Skeleton width="100%" height={300} />
                <Skeleton width={600} height={50} />
                <Skeleton width="100%" height={250} />
                <Skeleton width={300} height={50} />
                <Skeleton width="100%" height={300} />
            </div>
        );
    } else if (errors.length > 0) {
        content = <Text align={TextAlign.CENTER} title={t('article loading error')} />;
    } else {
        content = (
            <div>
                test article details page - #
                {id}
            </div>
        );
    }

    return (
        <DynamicModuleLoader key="articleDetails" reducers={reducers} removeAfterUnmout>
            <div className={classNames(cls.ArticleDetails, {}, [className])}>{content}</div>
        </DynamicModuleLoader>
    );
});
