import { HTMLAttributeAnchorTarget, memo } from 'react';

import ImageIcon from '@/shared/assets/svg/awesome_icons/image-solid.svg';
import EyeIcon from '@/shared/assets/svg/eye.svg';
import { getRouteArticleDetails } from '@/shared/consts/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { Article } from '../../model/types/article';

import cls from './SmallArticleCard.module.scss';
import { SmallArticleCardSkeleton } from './SmallArticleCardSkeleton';

interface SmallArticleCardProps {
    className?: string;
    article?: Article;
    isLoading?: boolean;
    target?: HTMLAttributeAnchorTarget;
}

export const SmallArticleCard = memo((props: SmallArticleCardProps) => {
    const { className, article, isLoading = false, target } = props;

    if (isLoading) {
        return <SmallArticleCardSkeleton />;
    }

    if (!article) {
        return null;
    }

    return (
        <AppLink
            className={classNames(cls.SmallArticleCard, {}, [className])}
            data-testid="SmallArticleCard"
            target={target}
            to={getRouteArticleDetails(article.id)}
        >
            <Card className={cls.cardWrapper}>
                <div className={cls.imageWrapper}>
                    <AppImage
                        alt="test mountains"
                        className={cls.img}
                        fallback={<Skeleton height="100%" width="100%" />}
                        src={article.img}
                        errorFallback={
                            <VStack align="Center" className={cls.fallback}>
                                <Icon Svg={ImageIcon} />
                            </VStack>
                        }
                    />
                </div>
                <VStack className={cls.content} gap="0">
                    <HStack className={cls.user} gap="8">
                        <Avatar alt={article.user.username} size={32} src={article.user.avatar} />
                        <Text text={article.user.username} weight="bold" />
                    </HStack>
                    <Text className={cls.title} size="m" title={article.title} />
                    <HStack gap="8" justify="SpaceBetween">
                        <Text text={article.publishedAt} />
                        <HStack gap="8">
                            <Icon Svg={EyeIcon} />
                            <Text text={article.views.toString()} />
                        </HStack>
                    </HStack>
                </VStack>
            </Card>
        </AppLink>
    );
});
