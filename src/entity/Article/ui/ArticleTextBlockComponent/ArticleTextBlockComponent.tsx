import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { FeatureToggle } from '@/shared/lib/features/components/FeatureToggle/FeatureToggle';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';

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
            {title && (
                <FeatureToggle
                    feature="isRedesignedApp"
                    off={<TextDeprecated className={cls.title} title={title} />}
                    on={<Text className={cls.title} title={title} />}
                />
            )}
            {paragraphs?.map((p) => (
                <FeatureToggle
                    feature="isRedesignedApp"
                    key={p}
                    off={<TextDeprecated className={cls.paragraph} text={p} />}
                    on={<Text className={cls.paragraph} text={p} />}
                />
            ))}
        </div>
    );
});
