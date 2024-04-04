import { HTMLAttributeAnchorTarget, memo } from 'react';

import EyeIcon from '@/shared/assets/svg/eye.svg';
import { getRouteArticleDetails } from '@/shared/consts/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { Button, ButtonSize } from '@/shared/ui/deprecated/Button';
import { Card } from '@/shared/ui/deprecated/Card';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';
import { AppImage } from '@/shared/ui/redesigned/AppImage';

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
                        fallbeck={<Skeleton height="100%" width="100%" />}
                        src={article.img}
                    />
                    <div className={cls.dateWrapper}>
                        <Button className={cls.date} size={ButtonSize.S} disabled>
                            {article.createdAt}
                        </Button>
                    </div>
                    <div className={cls.tags}>
                        {article.type.map((tag) => (
                            <Button key={tag} size={ButtonSize.S}>
                                {tag}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className={cls.content}>
                    <Text className={cls.title} size={TextSize.S} title={article.title} />
                    <div className={cls.views}>
                        <Icon className={cls.icon} Svg={EyeIcon} />
                        <Text size={TextSize.M} text={article.views.toString()} />
                    </div>
                </div>
            </Card>
        </AppLink>
    );
});
