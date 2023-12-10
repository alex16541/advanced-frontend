import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { Button } from 'shared/ui/Button';
import { useTranslation } from 'react-i18next';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cls from './ArticleDetailsPageHeader.module.scss';
import { selectIsUserCanEditArticle } from '../../model/selectors/article';

interface ArticleDetailsPageHeaderProps {
    className?: string;
}

export const ArticleDetailsPageHeader = memo((props: ArticleDetailsPageHeaderProps) => {
    const { className } = props;
    const { t } = useTranslation('article');
    const navigate = useNavigate();
    const canEdit = useSelector(selectIsUserCanEditArticle);

    const onBack = useCallback(() => {
        navigate(RoutePath.articles);
    }, [navigate]);

    const onEdit = useCallback(() => {
        navigate('edit');
    }, [navigate]);

    return (
        <header className={classNames(cls.ArticleDetailsPageHeader, {}, [className])}>
            <Button onClick={onBack}>{t('back')}</Button>
            {canEdit && <Button onClick={onEdit}>{t('edit')}</Button>}
        </header>
    );
});