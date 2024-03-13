import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import EyeIcon from '@/shared/assets/svg/eye.svg';
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
                <img className={cls.img} src={article.img} alt="test mountains" />
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
            {firstParagraph && <ArticleTextBlockComponent className={cls.text} articleBlock={firstParagraph} />}
            <div className={cls.actions}>
                <AppLink hover={false} to={`/articles/${article.id}`}>
                    <Button className={cls.button}>{t('read more')}</Button>
                </AppLink>
                <div className={cls.views}>
                    <Icon Svg={EyeIcon} className={cls.icon} />
                    <Text text={article.views.toString()} size={TextSize.M} />
                </div>
            </div>
        </Card>
    );
});
