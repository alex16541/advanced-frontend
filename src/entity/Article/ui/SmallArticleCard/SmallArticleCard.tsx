import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { Button, ButtonSize } from 'shared/ui/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import { Text, TextSize } from 'shared/ui/Text/Text';
import EyeIcon from 'shared/assets/svg/eye.svg';
import { Card } from 'shared/ui/Card/Card';
import cls from './SmallArticleCard.module.scss';
import { Article } from '../../model/types/article';
import { SmallArticleCardSkeleton } from './SmallArticleCardSkeleton';

interface SmallArticleCardProps {
    className?: string;
    article?: Article;
    isLoading?: boolean;
}

export const SmallArticleCard = memo((props: SmallArticleCardProps) => {
    const { className, article, isLoading = false } = props;

    if (isLoading) {
        return <SmallArticleCardSkeleton />;
    }

    if (!article) {
        return null;
    }

    return (
        <Card className={classNames(cls.SmallArticleCard, {}, [className])}>
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
                <AppLink to={article.id}>
                    <Text className={cls.title} title={article.title} size={TextSize.S} />
                </AppLink>
                <div className={cls.views}>
                    <Icon Svg={EyeIcon} className={cls.icon} />
                    <Text text={article.views.toString()} size={TextSize.M} />
                </div>
            </div>
        </Card>
    );
});
