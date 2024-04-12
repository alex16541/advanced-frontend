import { ArticleBlockType } from '../../model/consts/article';
import { ArticleBlock } from '../../model/types/article';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

import cls from './ArticleDetails.module.scss';

export const renderArticleBlock = (articleBlock: ArticleBlock) => {
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
};
