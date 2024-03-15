import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import EyeIcon from '@/shared/assets/svg/eye.svg';
import { getRouteArticleDetails } from '@/shared/consts/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink';
import { Button, ButtonSize } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Icon } from '@/shared/ui/Icon';
import { Text, TextSize } from '@/shared/ui/Text';

import { ArticleBlockType } from '../../model/consts/article';
import { Article, ArticleTextBlock } from '../../model/types/article';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

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
        const textBlock = article?.blocks.find((block) => block.type === ArticleBlockType.TEXT) as
            | ArticleTextBlock
            | undefined;

        return textBlock;
    }, [article?.blocks]);

    if (isLoading) {
        return <LargeArticleCardSkeleton />;
    }

    if (!article) {
        return null;
    }

    return (
        <Card className={classNames(cls.LargeArticleCard, {}, [className])}>
            <div className={cls.imageWrapper}>
                <img alt="test mountains" className={cls.img} src={article.img} />
                <div className={cls.dateWrapper}>
                    <Button className={cls.date} disabled>
                        {article.createdAt}
                    </Button>
                </div>
                <div className={cls.tags}>
                    {article.type.map((tag) => (
                        <Button key={tag} size={ButtonSize.M}>
                            {tag}
                        </Button>
                    ))}
                </div>
            </div>
            <Text className={cls.title} title={article.title} />
            {firstParagraph && <ArticleTextBlockComponent articleBlock={firstParagraph} className={cls.text} />}
            <div className={cls.actions}>
                <AppLink hover={false} to={getRouteArticleDetails(article.id)}>
                    <Button className={cls.button}>{t('read more')}</Button>
                </AppLink>
                <div className={cls.views}>
                    <Icon className={cls.icon} Svg={EyeIcon} />
                    <Text size={TextSize.M} text={article.views.toString()} />
                </div>
            </div>
        </Card>
    );
});
