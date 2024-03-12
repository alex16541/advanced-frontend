import { ReactElement, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextThemes } from '@/shared/ui/Text';
import { CommentList } from '@/entity/Comment';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { Skeleton } from '@/shared/ui/Skeleton';
import { useOnInit } from '@/shared/hooks/useOnInit';
import { articleCommentsReducer, articleCommentsSelectors } from '../../model/slices/articleCommentsListSlice';
import {
    getArticleCommentsListIsLoading,
    getArticleCommentsListError,
} from '../../model/selectors/articleCommentsList';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import cls from './ArticleCommentsList.module.scss';
import { ArticleCommentsListForm } from '../ArticleCommentsListForm/ArticleCommentsListForm';

export interface ArticleCommentsListProps {
    className?: string;
    articleId: string;
}

const reducers: ReducersList = {
    articleComments: articleCommentsReducer,
};

const ArticleCommentsList = memo((props: ArticleCommentsListProps) => {
    const { className, articleId } = props;
    const { t } = useTranslation('article');
    const dispatch = useAppDispatch();

    const isLoading = useSelector(getArticleCommentsListIsLoading);
    const commentsData = useSelector(articleCommentsSelectors.selectAll);
    const error = useSelector(getArticleCommentsListError);

    const fetchComments = useCallback(
        async (articleId: string) => {
            await dispatch(fetchCommentsByArticleId(articleId));
        },
        [dispatch],
    );

    const onCommentAdded = useCallback(() => fetchComments(articleId), [articleId, fetchComments]);

    useOnInit(() => {
        fetchComments(articleId);
    });

    const commentSkeleton = (
        <div className={cls.loader}>
            <Skeleton width={70} height={70} />
            <div className={cls.loader__column}>
                <Skeleton width={170} height={35} />
                <Skeleton width={350} height={25} />
            </div>
        </div>
    );

    let content!: ReactElement<any, any>;

    if (isLoading) {
        content = (
            <>
                {commentSkeleton}
                {commentSkeleton}
                {commentSkeleton}
            </>
        );
    } else if (error.length > 0) {
        content = <Text text={t('Article commets loading error')} theme={TextThemes.ERROR} />;
    } else {
        content = (
            <>
                <ArticleCommentsListForm onCommentAdded={onCommentAdded} />
                <CommentList comments={commentsData} />
            </>
        );
    }

    return (
        <DynamicModuleLoader
            className={classNames(cls.ArticleCommentsList, {}, [className])}
            reducers={reducers}
            removeAfterUnmout
        >
            <>
                <Text className={cls.title} title={t('Comments')} />
                {content}
            </>
        </DynamicModuleLoader>
    );
});

export default ArticleCommentsList;
