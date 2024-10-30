import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Article, createArticle } from '@/entity/Article';
import { getRouteArticleEdit } from '@/shared/consts/router';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useOnInit } from '@/shared/hooks/useOnInit';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/redesigned/Card';

import cls from './ArticleCreatePage.module.scss';
import { ArticleCreatePageSkeleton } from './ArticleCreatePageSkeleton';
import '../i18n/i18n';

interface ArticleCreatePageProps {
    className?: string;
}

const ArticleCreatePage = (props: ArticleCreatePageProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const [article, setArticle] = useState<Article | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { t } = useTranslation('ArticleCreatePage');
    const navigate = useNavigate();

    const createNewArticle = useCallback(async () => {
        try {
            const article = await dispatch(createArticle()).unwrap();

            setArticle(article);
            navigate(getRouteArticleEdit(article.id));
        } catch (e) {
            console.log(e);
        }
    }, [dispatch, navigate]);

    useOnInit(() => {
        setIsLoading(true);
        createNewArticle().then(() => {
            setIsLoading(false);
        });
    });

    if (isLoading) {
        return <ArticleCreatePageSkeleton />;
    }
    if (!article) {
        return (
            <Card className={classNames(cls.ArticleCreatePage, {}, [cls.error])}>
                {t('ARTICLE_CREATE_ERROR')}
            </Card>
        );
    }

    return <Card className={classNames(cls.ArticleCreatePage, {}, [className])}>{t('Article created')}</Card>;
};

export default ArticleCreatePage;
