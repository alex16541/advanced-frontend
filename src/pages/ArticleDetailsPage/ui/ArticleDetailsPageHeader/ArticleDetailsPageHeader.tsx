import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { getRouteArticles } from '@/shared/consts/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';


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
        
                        <Card className={classNames(cls.ArticleDetailsPageHeaderRedesigned, {}, [className])}>
                            <Button onClick={onBack}>{t('back')}</Button>
                        </Card>
                    
    );
});
