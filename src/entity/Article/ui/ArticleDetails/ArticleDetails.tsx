import { memo, ReactElement, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useOnInit } from '@/shared/hooks/useOnInit';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import {
    getArticleDetailsData,
    getArticleDetailsErrors,
    getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slices/articleDetailsSlice';

import cls from './ArticleDetails.module.scss';
import { renderArticleBlock } from './renderArticleBlock';

interface ArticleDetailsProps {
    className?: string;
    articleId: string;
}

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer,
};

const ArticleSkeleton = (
    
                <VStack data-testid="ArticleDetails.Skeleton" gap="16">
                    <VStack gap="8">
                        <HStack gap="8">
                            <Skeleton height="32px" width="32px" />
                            <Skeleton height="22px" width="40px" />
                            <Skeleton height="22px" width="60px" />
                        </HStack>
                        <Skeleton height="36px" width="80%" />
                    </VStack>
                    <Skeleton height="32px" width="40%" />
                    <Skeleton height="350px" width="100%" />
                    <VStack gap="8">
                        <Skeleton height="32px" width="70%" />
                        <Skeleton height="24px" width="100%" />
                        <Skeleton height="24px" width="100%" />
                        <Skeleton height="24px" width="30%" />
                    </VStack>
                    <VStack gap="8">
                        <Skeleton height="32px" width="50%" />
                        <Skeleton height="24px" width="100%" />
                        <Skeleton height="24px" width="100%" />
                        <Skeleton height="24px" width="100%" />
                        <Skeleton height="24px" width="30%" />
                    </VStack>
                    <VStack gap="8">
                        <Skeleton height="32px" width="30%" />
                        <Skeleton height="24px" width="100%" />
                        <Skeleton height="24px" width="100%" />
                        <Skeleton height="24px" width="30%" />
                    </VStack>
                    <VStack gap="8">
                        <Skeleton height="32px" width="45%" />
                        <Skeleton height="24px" width="100%" />
                        <Skeleton height="24px" width="100%" />
                        <Skeleton height="24px" width="100%" />
                        <Skeleton height="24px" width="100%" />
                        <Skeleton height="24px" width="100%" />
                        <Skeleton height="24px" width="30%" />
                    </VStack>
                    <Skeleton height="350px" width="100%" />
                    <VStack gap="8">
                        <Skeleton height="32px" width="15%" />
                        <Skeleton height="24px" width="100%" />
                        <Skeleton height="24px" width="100%" />
                        <Skeleton height="24px" width="100%" />
                        <Skeleton height="24px" width="30%" />
                    </VStack>
                </VStack>
            
);

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { className, articleId } = props;

    const dispatch = useAppDispatch();

    const articleData = useSelector(getArticleDetailsData);
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const errors = useSelector(getArticleDetailsErrors);
    const { t } = useTranslation('article');

    const fetchArticle = useCallback(
        async (id: string) => {
            await dispatch(fetchArticleById(id));
        },
        [dispatch],
    );

    useOnInit(() => {
        if (articleId) {
            fetchArticle(articleId);
        }
    });

    let content!: ReactElement<any, any>;

    if (isLoading) {
        content = ArticleSkeleton;
    } else if (errors.length > 0) {
        content = (
            <Text align="center" title={t('article loading error')} />
        );
    } else {
        content = (
            
                                <>
                                    <header className={cls.header}>
                                        <HStack gap="8">
                                            <Avatar
                                                alt={articleData?.user.username ?? ''}
                                                className={cls.img}
                                                size={32}
                                                src={articleData?.user.avatar}
                                            />
                                            <HStack className={cls.user} gap="8">
                                                <Text text={articleData?.user.username} weight="bold" />
                                                <Text size="s" text={articleData?.createdAt} />
                                            </HStack>
                                        </HStack>
                                        <VStack gap="0">
                                            <Text size="l" title={articleData?.title} weight="bold" />
                                            <Text size="l" text={articleData?.subtitle} />
                                        </VStack>
                                        <AppImage
                                            alt="test mountains"
                                            className={cls.img}
                                            fallbeck={<Skeleton height="100%" width="100%" />}
                                            src={articleData?.img}
                                        />
                                    </header>

                                    <div className={cls.content}>{articleData?.blocks.map(renderArticleBlock)}</div>
                                </>
                            
        );
    }

    return (
        <DynamicModuleLoader key="articleDetails" reducers={reducers} removeAfterUnmout>
            <article
                data-testid="ArticleDetails"
                className={classNames(
                    cls.ArticleDetailsRedesigned,
                    {},
                    [className],
                )}
            >
                {content}
            </article>
        </DynamicModuleLoader>
    );
});
