import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import EyeIcon from '@/shared/assets/svg/eye.svg';
import { getRouteArticleDetails } from '@/shared/consts/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { ArticleBlockType } from '../../model/consts/article';
import { Article, ArticleTextBlock } from '../../model/types/article';

import cls from './LargeArticleCard.module.scss';
import { LargeArticleCardSkeleton } from './LargeArticleCardSkeleton';

interface LargeArticleCardProps {
    className?: string;
    article?: Article;
    isLoading?: boolean;
}

export const LargeArticleCard = memo((props: LargeArticleCardProps) => {
    const { className, article, isLoading = false } = props;
    const { t } = useTranslation('article');
    const firstParagraph = useMemo(() => {
        const textBlock = (
            article?.blocks.find((block) => block.type === ArticleBlockType.TEXT) as ArticleTextBlock
        )?.paragraphs
            .slice(0, 2)
            .join(' ');

        return textBlock;
    }, [article?.blocks]);

    if (isLoading) {
        return <LargeArticleCardSkeleton />;
    }

    if (!article) {
        return null;
    }

    return (
        <Card className={classNames(cls.LargeArticleCard, {}, [className])} data-testid="LargeArticleCard">
            <VStack gap="16">
                <VStack gap="8">
                    <HStack className={cls.header} gap="8">
                        <Avatar alt={article.user.username} size={32} src={article.user.avatar} />
                        <div className={cls.headerText}>
                            <Text text={article.user.username} weight="bold" />
                            <Text size="s" text={article.createdAt} />
                        </div>
                    </HStack>
                    <Text className={cls.title} size="l" title={article.title} weight="black" />
                </VStack>
                <Text className={cls.description} HeaderTag="p" title={article.subtitle} />
                <div className={cls.imageWrapper}>
                    <AppImage
                        alt="test mountains"
                        className={cls.img}
                        fallbeck={<Skeleton height="100%" width="100%" />}
                        src={article.img}
                    />
                    <div className={cls.tags}>
                        {article.type.map((tag) => (
                            <Button key={tag}>{tag}</Button>
                        ))}
                    </div>
                </div>
                {firstParagraph && <Text className={cls.text} text={firstParagraph} />}
                <div className={cls.actions}>
                    <AppLink hover={false} to={getRouteArticleDetails(article.id)}>
                        <Button className={cls.button}>{t('read more')}</Button>
                    </AppLink>
                    <div className={cls.views}>
                        <Icon className={cls.icon} Svg={EyeIcon} />
                        <Text text={article.views.toString()} />
                    </div>
                </div>
            </VStack>
        </Card>
    );
});
