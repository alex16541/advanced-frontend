import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { FeatureToggle } from '@/shared/lib/features/components/FeatureToggle/FeatureToggle';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Text as TextDeprecated, TextAlign } from '@/shared/ui/deprecated/Text';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

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
        <FeatureToggle
            feature="isRedesignedApp"
            off={
                <div className={classNames(cls.ArticleImageBlockComponent, {}, [className])}>
                    <AppImage
                        alt={title}
                        fallbeck={<SkeletonDeprecated height="450px" width="100%" />}
                        src={src}
                    />
                    {title && <TextDeprecated align={TextAlign.CENTER} text={title} />}
                </div>
            }
            on={
                <VStack
                    className={classNames(cls.ArticleImageBlockComponentRedesigned, {}, [className])}
                    gap="8"
                >
                    <AppImage alt={title} fallbeck={<Skeleton height="450px" width="100%" />} src={src} />
                    {title && <Text align="center" text={title} />}
                </VStack>
            }
        />
    );
});
