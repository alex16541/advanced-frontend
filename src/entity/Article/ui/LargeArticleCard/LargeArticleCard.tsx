import { useTranslation } from 'react-i18next';

import { DescriptionTextEditor } from '@/entity/TextEditor';
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

import { Article } from '../../model/types/article';

import cls from './LargeArticleCard.module.scss';
import { LargeArticleCardSkeleton } from './LargeArticleCardSkeleton';
import './LargeArticleCard.i18n';

interface LargeArticleCardProps {
    className?: string;
    article?: Article;
    isLoading?: boolean;
}

export const LargeArticleCard = (props: LargeArticleCardProps) => {
    const { className, article, isLoading = false } = props;
    const { t } = useTranslation('LargeArticleCard');

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
                            <Text size="s" text={article.publishedAt} />
                        </div>
                    </HStack>
                    <Text className={cls.title} size="l" title={article.title} weight="black" />
                </VStack>
                {!!article.type.length && (
                    <div className={cls.tags}>
                        {article.type.map((tag) => (
                            <Button key={tag} size="xs">
                                {tag}
                            </Button>
                        ))}
                    </div>
                )}
                {article.img && (
                    <div className={cls.imageWrapper}>
                        <AppImage
                            alt="test mountains"
                            className={cls.img}
                            fallback={<Skeleton height="100%" width="100%" />}
                            src={article.img}
                        />
                    </div>
                )}
                {article.description && (
                    <DescriptionTextEditor className={cls.description} content={article.description} />
                )}
                <div className={cls.actions}>
                    <AppLink hover={false} to={getRouteArticleDetails(article.id)}>
                        <Button className={cls.button}>{t('Read more')}</Button>
                    </AppLink>
                    <div className={cls.views}>
                        <Icon className={cls.icon} Svg={EyeIcon} />
                        <Text text={article.views.toString()} />
                    </div>
                </div>
            </VStack>
        </Card>
    );
};
