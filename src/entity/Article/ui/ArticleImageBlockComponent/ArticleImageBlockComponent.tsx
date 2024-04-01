import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { AppImage } from '@/shared/ui/deprecated/AppImage';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { Text, TextAlign } from '@/shared/ui/deprecated/Text';

import { ArticleImageBlock } from '../../model/types/article';

import cls from './ArticleImageBlockComponent.module.scss';

interface ArticleImageBlockComponentProps {
    className?: string;
    articleBlock: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo((props: ArticleImageBlockComponentProps) => {
    const { className, articleBlock } = props;
    const { src, title } = articleBlock;

    return (
        <div className={classNames(cls.ArticleImageBlockComponent, {}, [className])}>
            <AppImage alt={title} fallbeck={<Skeleton height="450px" width="100%" />} src={src} />
            {title && <Text align={TextAlign.CENTER} text={title} />}
        </div>
    );
});
