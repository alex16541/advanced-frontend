import { memo, ReactElement } from 'react';

import { ArticleDetailsSkeleton, useArticleData } from '@/entity/Article';
import { ArticleEditor } from '@/features/ArticleEditor';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import cls from './ArticleDetails.module.scss';

interface ArticleDetailsProps {
    className?: string;
    articleId: string;
}

const ArticleDetails = (props: ArticleDetailsProps) => {
    const { className, articleId } = props;

    const { articleData, isLoading, errors, reducers } = useArticleData({ articleId });

    let content!: ReactElement<any, any>;

    if (isLoading) {
        content = <ArticleDetailsSkeleton />;
    } else if (errors) {
        content = errors;
    } else {
        content = (
            <>
                <header className={cls.header}>
                    <Card>
                        <HStack gap="8">
                            <Avatar
                                alt={articleData.user.username ?? ''}
                                className={cls.img}
                                size={32}
                                src={articleData.user.avatar}
                            />
                            <HStack className={cls.user} gap="8">
                                <Text text={articleData.user.username} weight="bold" />
                                <Text size="s" text={articleData.createdAt} />
                            </HStack>
                        </HStack>
                    </Card>
                </header>

                <div className={cls.content}>{articleData && <ArticleEditor article={articleData} />}</div>
            </>
        );
    }

    return (
        <DynamicModuleLoader key="articleDetails" reducers={reducers}>
            <article className={classNames(cls.ArticleDetails, {}, [className])} data-testid="ArticleDetails">
                {content}
            </article>
        </DynamicModuleLoader>
    );
};

const Memoized = memo(ArticleDetails);

export { Memoized as ArticleDetails };
