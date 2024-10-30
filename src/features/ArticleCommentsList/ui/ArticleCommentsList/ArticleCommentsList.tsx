import { ReactElement, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { CommentList } from '@/entity/Comment';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useOnInit } from '@/shared/hooks/useOnInit';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import {
    getArticleCommentsListIsLoading,
    getArticleCommentsListError,
} from '../../model/selectors/articleCommentsList';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import {
    articleCommentsReducer,
    articleCommentsSelectors,
} from '../../model/slices/articleCommentsListSlice';
import { ArticleCommentsListForm } from '../ArticleCommentsListForm/ArticleCommentsListForm';

import cls from './ArticleCommentsList.module.scss';
import '../../i18n/i18n';

export interface ArticleCommentsListProps {
    className?: string;
    articleId: string;
}

const reducers: ReducersList = {
    articleComments: articleCommentsReducer,
};

const ArticleCommentsList = (props: ArticleCommentsListProps) => {
    const { className, articleId } = props;
    const { t } = useTranslation('ArticleCommentsList');
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

    const onCommentAdded = () => fetchComments(articleId);

    useOnInit(() => {
        fetchComments(articleId);
    });

    const CommentSkeleton = (
        <HStack className={cls.loader} gap="10">
            <Skeleton border="16px" height={32} width={32} />
            <VStack gap="10">
                <Skeleton height={35} width={170} />
                <Skeleton height={25} width={350} />
            </VStack>
        </HStack>
    );

    let content!: ReactElement<any, any>;

    if (isLoading) {
        content = (
            <>
                {CommentSkeleton}
                {CommentSkeleton}
                {CommentSkeleton}
            </>
        );
    } else if (error.length > 0) {
        content = <Text text={t('COMMENTS_LOADING_ERROR')} theme="error" />;
    } else {
        content = (
            <VStack gap="16">
                <Card>
                    <ArticleCommentsListForm onCommentAdded={onCommentAdded} />
                </Card>
                <CommentList comments={commentsData} />
            </VStack>
        );
    }

    return (
        <DynamicModuleLoader
            className={classNames(cls.ArticleCommentsList, {}, [className])}
            reducers={reducers}
            removeAfterUnmout
        >
            <>
                <Text className={cls.title} size="l" title={t('Comments')} weight="bold" />
                {content}
            </>
        </DynamicModuleLoader>
    );
};

export default ArticleCommentsList;
