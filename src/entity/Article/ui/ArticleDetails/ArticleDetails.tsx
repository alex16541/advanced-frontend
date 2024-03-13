import {
    memo, ReactElement, useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import CalendarIcon from '@/shared/assets/svg/calendar.svg';
import EyeIcon from '@/shared/assets/svg/eye.svg';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useOnInit } from '@/shared/hooks/useOnInit';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Avatar } from '@/shared/ui/Avatar';
import { Icon } from '@/shared/ui/Icon';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Text, TextAlign, TextSize } from '@/shared/ui/Text';

import { ArticleBlockType } from '../../model/consts/article';
import {
    getArticleDetailsData,
    getArticleDetailsErrors,
    getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slices/articleDetailsSlice';
import { ArticleBlock } from '../../model/types/article';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

import cls from './ArticleDetails.module.scss';

interface ArticleDetailsProps {
    className?: string;
    articleId: string;
}

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { className, articleId } = props;

    const dispatch = useAppDispatch();

    const articleData = useSelector(getArticleDetailsData);
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const errors = useSelector(getArticleDetailsErrors);
    const { t } = useTranslation('article');

    const fetchArticle = useCallback(
        async (id: string) => {
            await dispatch(fetchArticleById(id));
        },
        [dispatch],
    );

    useOnInit(() => {
        if (articleId) {
            fetchArticle(articleId);
        }
    });

    let content!: ReactElement<any, any>;

    const renderArticleBlock = useCallback((articleBlock: ArticleBlock) => {
        switch (articleBlock.type) {
            case ArticleBlockType.TEXT:
                return (
                    <ArticleTextBlockComponent
                        className={cls.articleBlock}
                        key={articleBlock.id}
                        articleBlock={articleBlock}
                    />
                );
            case ArticleBlockType.IMAGE:
                return (
                    <ArticleImageBlockComponent
                        className={cls.articleBlock}
                        key={articleBlock.id}
                        articleBlock={articleBlock}
                    />
                );
            case ArticleBlockType.CODE:
                return (
                    <ArticleCodeBlockComponent
                        className={cls.articleBlock}
                        key={articleBlock.id}
                        articleBlock={articleBlock}
                    />
                );
            default:
                return null;
        }
    }, []);

    if (isLoading) {
        content = (
            <div className={cls.loaderColumn}>
                <div className={cls.loaderRow}>
                    <Skeleton width={100} height={100} />
                    <div className={cls.loaderColumn}>
                        <Skeleton width={230} height={20} />
                        <Skeleton width={170} height={20} />
                        <Skeleton width="100%" height={40} />
                    </div>
                </div>
                <Skeleton width={300} height={50} />
                <Skeleton width="100%" height={300} />
                <Skeleton width={600} height={50} />
                <Skeleton width="100%" height={250} />
                <Skeleton width={300} height={50} />
                <Skeleton width="100%" height={300} />
            </div>
        );
    } else if (errors.length > 0) {
        content = <Text align={TextAlign.CENTER} title={t('article loading error')} />;
    } else {
        content = (
            <>
                <header className={cls.header}>
                    {articleData?.img && (
                        <Avatar className={cls.img} size={100} src={articleData.img} alt={articleData.title} />
                    )}
                    <div className={cls.articleInfo}>
                        <Text
                            className={cls.title}
                            title={articleData?.title}
                            text={articleData?.subtitle}
                            size={TextSize.L}
                        />
                        <div className={cls.views}>
                            <Icon Svg={EyeIcon} className={cls.icon} />
                            <Text text={articleData?.views.toString()} />
                        </div>
                        <div className={cls.createdAt}>
                            <Icon Svg={CalendarIcon} className={cls.icon} />
                            <Text text={articleData?.createdAt} />
                        </div>
                    </div>
                </header>

                <div className={cls.content}>{articleData?.blocks.map(renderArticleBlock)}</div>

                <footer className={cls.footer} />
            </>
        );
    }

    return (
        <DynamicModuleLoader key="articleDetails" reducers={reducers} removeAfterUnmout>
            <article className={classNames(cls.ArticleDetails, {}, [className])}>{content}</article>
        </DynamicModuleLoader>
    );
});
