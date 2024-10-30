import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getRouteArticleEdit } from '@/shared/consts/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/redesigned/Button';

import { selectIsUserCanEditArticle } from '../../model/selectors/article';

import cls from './ArticleEditButton.module.scss';

interface ArticleEditButtonProps {
    className?: string;
    articleId?: string;
}

const ArticleEditButton = (props: ArticleEditButtonProps) => {
    const { className, articleId } = props;
    const { t } = useTranslation('ArticleDetailsPage');
    const navigate = useNavigate();
    const canEdit = useSelector(selectIsUserCanEditArticle);

    const onEdit = useCallback(() => {
        if (articleId) {
            navigate(getRouteArticleEdit(articleId));
        }
    }, [navigate, articleId]);

    if (!canEdit) return null;

    return (
        <Button className={classNames(cls.ArticleEditButton, {}, [className])} onClick={onEdit}>
            {t('edit')}
        </Button>
    );
};

const Memoized = memo(ArticleEditButton);

export { Memoized as ArticleEditButton };
