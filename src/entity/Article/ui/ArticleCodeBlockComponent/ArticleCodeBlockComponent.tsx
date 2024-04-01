import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Code } from '@/shared/ui/deprecated/Code';

import { ArticleCodeBlock } from '../../model/types/article';

import cls from './ArticleCodeBlockComponent.module.scss';

interface ArticleCodeBlockComponentProps {
    className?: string;
    articleBlock: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent = memo((props: ArticleCodeBlockComponentProps) => {
    const { className, articleBlock } = props;

    const { code: codeText } = articleBlock;

    return (
        <Code className={classNames(cls.ArticleCodeBlockComponent, {}, [className])} codeText={codeText} />
    );
});
