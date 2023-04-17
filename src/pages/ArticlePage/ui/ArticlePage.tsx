import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticlePage.module.scss';

interface ArticlePageProps {
    className?: string;
}

const ArticlePage = (props: ArticlePageProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.ArticlePage, {}, [className])}>
            test article details
        </div>
    );
};

export default memo(ArticlePage);
