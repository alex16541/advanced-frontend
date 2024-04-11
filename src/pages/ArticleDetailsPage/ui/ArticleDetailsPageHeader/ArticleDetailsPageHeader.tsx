import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { getRouteArticles } from '@/shared/consts/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { FeatureToggle } from '@/shared/lib/features/components/FeatureToggle/FeatureToggle';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';

import { ArticleEditButton } from '../ArticleEditButton/ArticleEditButton';

import cls from './ArticleDetailsPageHeader.module.scss';

interface ArticleDetailsPageHeaderProps {
    className?: string;
    articleId: string;
}

export const ArticleDetailsPageHeader = memo((props: ArticleDetailsPageHeaderProps) => {
    const { className, articleId } = props;
    const { t } = useTranslation('article');
    const navigate = useNavigate();

    const onBack = useCallback(() => {
        navigate(getRouteArticles());
    }, [navigate]);

    return (
        <FeatureToggle
            feature="isRedesignedApp"
            off={
                <header className={classNames(cls.ArticleDetailsPageHeader, {}, [className])}>
                    <ButtonDeprecated onClick={onBack}>{t('back')}</ButtonDeprecated>
                    <ArticleEditButton />
                </header>
            }
            on={
                <Card className={classNames(cls.ArticleDetailsPageHeaderRedesigned, {}, [className])}>
                    <Button onClick={onBack}>{t('back')}</Button>
                </Card>
            }
        />
    );
});
