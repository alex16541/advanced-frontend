import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getRouteArticleEdit, getRouteArticles } from '@/shared/consts/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button';

import { selectIsUserCanEditArticle } from '../../model/selectors/article';

import cls from './ArticleDetailsPageHeader.module.scss';

interface ArticleDetailsPageHeaderProps {
    className?: string;
    articleId: string;
}

export const ArticleDetailsPageHeader = memo((props: ArticleDetailsPageHeaderProps) => {
    const { className, articleId } = props;
    const { t } = useTranslation('article');
    const navigate = useNavigate();
    const canEdit = useSelector(selectIsUserCanEditArticle);

    const onBack = useCallback(() => {
        navigate(getRouteArticles());
    }, [navigate]);

    const onEdit = useCallback(() => {
        navigate(getRouteArticleEdit(articleId));
    }, [navigate, articleId]);

    return (
        <header className={classNames(cls.ArticleDetailsPageHeader, {}, [className])}>
            <Button onClick={onBack}>{t('back')}</Button>
            {canEdit && <Button onClick={onEdit}>{t('edit')}</Button>}
        </header>
    );
});
