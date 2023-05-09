import { classNames } from 'shared/lib/classNames/classNames';
import { ReactElement, memo, useCallback } from 'react';
import { Text, TextThemes } from 'shared/ui/Text/Text';
import { CommentList } from 'entity/Comment';
import { useTranslation } from 'react-i18next';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { Skeleton } from 'shared/ui/Skeleton';
import { useOnInit } from 'shared/hooks/useOnInit';
import cls from './ArticleCommentsList.module.scss';
import { articleCommentsReducer, articleCommentsSelectors } from '../model/slices/articleCommentsList';
import { fetchCommentsByArticleId } from '../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getArticleCommentsListError, getArticleCommentsListIsLoading } from '../model/selectors/articleCommentsList';

interface ArticleCommentsListProps {
    className?: string;
    articleId: string;
}

const reducers: ReducersList = {
    articleComments: articleCommentsReducer,
};

export const ArticleCommentsList = memo((props: ArticleCommentsListProps) => {
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
        content = <CommentList comments={commentsData} />;
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmout>
            <div className={classNames(cls.ArticleCommentsList, {}, [className])}>
                <Text className={cls.title} title={t('Comments')} />
                {content}
            </div>
        </DynamicModuleLoader>
    );
});
