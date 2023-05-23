import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Text } from 'shared/ui/Text/Text';
import { ArticleTextBlock } from 'entity/Article/model/types/article';
import cls from './ArticleTextBlockComponent.module.scss';

interface ArticleTextBlockComponentProps {
    className?: string;
    articleBlock: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo((props: ArticleTextBlockComponentProps) => {
    const { className, articleBlock } = props;
    const { title, paragraphs } = articleBlock;

    return (
        <div className={classNames(cls.ArticleTextBlockComponent, {}, [className])}>
            {title && <Text className={cls.title} title={title} />}
            {paragraphs?.map((p) => (
                <Text className={cls.paragraph} key={p} text={p} />
            ))}
        </div>
    );
});