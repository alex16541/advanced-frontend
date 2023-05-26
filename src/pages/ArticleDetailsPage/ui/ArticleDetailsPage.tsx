import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { ArticleDetails } from 'entity/Article';
import { useNavigate, useParams } from 'react-router-dom';
import { Text } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { ArticleCommentsList } from 'features/ArticleCommentsList';
import { Button } from 'shared/ui/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage = memo((props: ArticleDetailsPageProps) => {
    const { className } = props;
    let { id } = useParams<{ id: string }>();
    const { t } = useTranslation('article');
    const navigate = useNavigate();

    const onBack = () => {
        navigate(RoutePath.articles);
    };

    if (__PROJECT__ === 'storybook') id = '1';

    if (!id) {
        return (
            <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                <Text title={t('article not found')} />
            </div>
        );
    }

    return (
        <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            <header className={cls.header}>
                <Button onClick={onBack}>{t('back')}</Button>
            </header>
            <ArticleDetails id={id} />
            <ArticleCommentsList className={cls.comments__list} articleId={id} />
        </div>
    );
});

export default ArticleDetailsPage;
