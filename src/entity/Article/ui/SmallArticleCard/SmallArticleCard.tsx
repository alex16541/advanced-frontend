import { HTMLAttributeAnchorTarget, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink';
import { Button, ButtonSize } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Text, TextSize } from '@/shared/ui/Text';
import EyeIcon from '@/shared/assets/svg/eye.svg';
import { Card } from '@/shared/ui/Card';
import cls from './SmallArticleCard.module.scss';
import { Article } from '../../model/types/article';
import { SmallArticleCardSkeleton } from './SmallArticleCardSkeleton';

interface SmallArticleCardProps {
    className?: string;
    article?: Article;
    isLoading?: boolean;
    target?: HTMLAttributeAnchorTarget;
}

export const SmallArticleCard = memo((props: SmallArticleCardProps) => {
    const {
        className, article, isLoading = false, target,
    } = props;

    if (isLoading) {
        return <SmallArticleCardSkeleton />;
    }

    if (!article) {
        return null;
    }

    return (
        <AppLink
            to={`/articles/${article.id}`}
            target={target}
            className={classNames(cls.SmallArticleCard, {}, [className])}
        >
            <Card className={cls.cardWrapper}>
                <div className={cls.imageWrapper}>
                    <img className={cls.img} src={article.img} alt="test mountains" />
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
                    <Text className={cls.title} title={article.title} size={TextSize.S} />
                    <div className={cls.views}>
                        <Icon Svg={EyeIcon} className={cls.icon} />
                        <Text text={article.views.toString()} size={TextSize.M} />
                    </div>
                </div>
            </Card>
        </AppLink>
    );
});
