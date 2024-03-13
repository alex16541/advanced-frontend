import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/Text';

import { ArticleTextBlock } from '../../model/types/article';

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
