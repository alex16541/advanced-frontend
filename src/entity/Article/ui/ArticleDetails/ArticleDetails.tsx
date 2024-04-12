import { memo, ReactElement, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import CalendarIcon from '@/shared/assets/svg/calendar.svg';
import EyeIcon from '@/shared/assets/svg/eye.svg';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useOnInit } from '@/shared/hooks/useOnInit';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { featureToggle } from '@/shared/lib/features';
import { FeatureToggle } from '@/shared/lib/features/components/FeatureToggle/FeatureToggle';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Text as TextDeprecated, TextAlign, TextSize } from '@/shared/ui/deprecated/Text';
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
    <FeatureToggle
        feature="isRedesignedApp"
        off={
            <div className={cls.loaderColumn} data-testid="ArticleDetails.Skeleton">
                <div className={cls.loaderRow}>
                    <SkeletonDeprecated height={120} width={120} />
                    <div className={cls.loaderColumn}>
                        <SkeletonDeprecated height={20} width={230} />
                        <SkeletonDeprecated height={20} width={170} />
                        <SkeletonDeprecated height={40} width="100%" />
                    </div>
                </div>
                <SkeletonDeprecated height={50} width={300} />
                <SkeletonDeprecated height={300} width="100%" />
                <SkeletonDeprecated height={50} width={600} />
                <SkeletonDeprecated height={250} width="100%" />
                <SkeletonDeprecated height={50} width={300} />
                <SkeletonDeprecated height={300} width="100%" />
            </div>
        }
        on={
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
        }
    />
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
            <FeatureToggle
                feature="isRedesignedApp"
                off={<TextDeprecated align={TextAlign.CENTER} title={t('article loading error')} />}
                on={<Text align="center" title={t('article loading error')} />}
            />
        );
    } else {
        content = (
            <FeatureToggle
                feature="isRedesignedApp"
                off={
                    <>
                        <header className={cls.header}>
                            {articleData?.user.avatar && (
                                <AvatarDeprecated
                                    alt={articleData.user.username}
                                    className={cls.img}
                                    size={120}
                                    src={articleData.user.avatar}
                                />
                            )}
                            <div className={cls.articleInfo}>
                                <TextDeprecated
                                    className={cls.title}
                                    size={TextSize.L}
                                    text={articleData?.subtitle}
                                    title={articleData?.title}
                                />
                                <div className={cls.views}>
                                    <IconDeprecated className={cls.icon} Svg={EyeIcon} />
                                    <TextDeprecated text={articleData?.views.toString()} />
                                </div>
                                <div className={cls.createdAt}>
                                    <IconDeprecated className={cls.icon} Svg={CalendarIcon} />
                                    <TextDeprecated text={articleData?.createdAt} />
                                </div>
                            </div>
                        </header>

                        <div className={cls.content}>{articleData?.blocks.map(renderArticleBlock)}</div>

                        <footer className={cls.footer} />
                    </>
                }
                on={
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
                }
            />
        );
    }

    return (
        <DynamicModuleLoader key="articleDetails" reducers={reducers} removeAfterUnmout>
            <article
                data-testid="ArticleDetails"
                className={classNames(
                    featureToggle({
                        name: 'isRedesignedApp',
                        on: () => cls.ArticleDetailsRedesigned,
                        off: () => cls.ArticleDetails,
                    }),
                    {},
                    [className],
                )}
            >
                {content}
            </article>
        </DynamicModuleLoader>
    );
});
