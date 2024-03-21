import { memo, ReactElement, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import CalendarIcon from '@/shared/assets/svg/calendar.svg';
import EyeIcon from '@/shared/assets/svg/eye.svg';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useOnInit } from '@/shared/hooks/useOnInit';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
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
                        articleBlock={articleBlock}
                        className={cls.articleBlock}
                        key={articleBlock.id}
                    />
                );
            case ArticleBlockType.IMAGE:
                return (
                    <ArticleImageBlockComponent
                        articleBlock={articleBlock}
                        className={cls.articleBlock}
                        key={articleBlock.id}
                    />
                );
            case ArticleBlockType.CODE:
                return (
                    <ArticleCodeBlockComponent
                        articleBlock={articleBlock}
                        className={cls.articleBlock}
                        key={articleBlock.id}
                    />
                );
            default:
                return null;
        }
    }, []);

    if (isLoading) {
        content = (
            <div className={cls.loaderColumn} data-testid="ArticleDetails.Skeleton">
                <div className={cls.loaderRow}>
                    <Skeleton height={120} width={120} />
                    <div className={cls.loaderColumn}>
                        <Skeleton height={20} width={230} />
                        <Skeleton height={20} width={170} />
                        <Skeleton height={40} width="100%" />
                    </div>
                </div>
                <Skeleton height={50} width={300} />
                <Skeleton height={300} width="100%" />
                <Skeleton height={50} width={600} />
                <Skeleton height={250} width="100%" />
                <Skeleton height={50} width={300} />
                <Skeleton height={300} width="100%" />
            </div>
        );
    } else if (errors.length > 0) {
        content = <Text align={TextAlign.CENTER} title={t('article loading error')} />;
    } else {
        content = (
            <>
                <header className={cls.header}>
                    {articleData?.user.avatar && (
                        <Avatar
                            alt={articleData.user.username}
                            className={cls.img}
                            size={120}
                            src={articleData.user.avatar}
                        />
                    )}
                    <div className={cls.articleInfo}>
                        <Text
                            className={cls.title}
                            size={TextSize.L}
                            text={articleData?.subtitle}
                            title={articleData?.title}
                        />
                        <div className={cls.views}>
                            <Icon className={cls.icon} Svg={EyeIcon} />
                            <Text text={articleData?.views.toString()} />
                        </div>
                        <div className={cls.createdAt}>
                            <Icon className={cls.icon} Svg={CalendarIcon} />
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
            <article className={classNames(cls.ArticleDetails, {}, [className])} data-testid="ArticleDetails">
                {content}
            </article>
        </DynamicModuleLoader>
    );
});
