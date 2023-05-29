import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { Button, ButtonSize } from 'shared/ui/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import { Text, TextSize } from 'shared/ui/Text/Text';
import EyeIcon from 'shared/assets/svg/eye.svg';
import { Card } from 'shared/ui/Card/Card';
import { Skeleton } from 'shared/ui/Skeleton';
import cls from './SmallArticleCard.module.scss';
import { Article } from '../../model/types/article';

interface SmallArticleCardProps {
    className?: string;
}

export const SmallArticleCardSkeleton = memo((props: SmallArticleCardProps) => {
    const { className } = props;

    return (
        <Card className={classNames(cls.skeleton, {}, [className, cls.skeleton])}>
            <Skeleton width="100%" height="150px" />

            <div className={cls.content}>
                <div className={cls.column}>
                    <Skeleton width="100%" height="30px" />
                    <Skeleton width="70%" height="30px" />
                </div>
                <Skeleton width="100px" height="30px" />
            </div>
        </Card>
    );
});
