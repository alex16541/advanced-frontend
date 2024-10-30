import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getArticleDetailsData } from '@/entity/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text';

import { ArticleEditButton } from '../ArticleEditButton/ArticleEditButton';

import cls from './ArticleInfo.module.scss';

interface ArticleInfoProps {
    className?: string;
    articleId?: string;
}

const ArticleInfo = (props: ArticleInfoProps) => {
    const { className, articleId } = props;
    const { t } = useTranslation('ArticleDetailsPage');

    const articleData = useSelector(getArticleDetailsData);

    if (!articleData) return null;

    return (
        <Card className={classNames(cls.ArticleInfo, {}, [className])}>
            <ArticleEditButton articleId={articleId} />
            <Text text={t('views', { count: Number(articleData.views) ?? 0 })} />
        </Card>
    );
};

const Memoized = memo(ArticleInfo);

export { Memoized as ArticleInfo };
