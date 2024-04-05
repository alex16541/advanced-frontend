import { memo } from 'react';

import { ArticleOrderSelector } from '@/features/ArticleOrderSelector';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeChips } from '@/features/ArticleTypeChips';
import { classNames } from '@/shared/lib/classNames/classNames';
import { FeatureToggle } from '@/shared/lib/features/FeatureToggle/FeatureToggle';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Card } from '@/shared/ui/redesigned/Card';
import { Input } from '@/shared/ui/redesigned/Input';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { useArticlesFilters } from '../../libs/hooks/useArticlesFilters';

import cls from './ArticlesFilters.module.scss';

interface ArticlesFilterProps {
    className?: string;
}

const ArticlesFilters = (props: ArticlesFilterProps) => {
    const { className } = props;
    const { t, order, sort, type, search, isLoading, searchChange, sortChange, orderChange, typeChange } =
        useArticlesFilters();

    return (
        <FeatureToggle
            feature="isRedesignedApp"
            off={
                <VStack className={classNames(cls.ArticlesFilters, {}, [className])} gap="10" maxWidth>
                    <InputDeprecated
                        isLoading={isLoading}
                        placeholder={t('Search')}
                        value={search}
                        fullWidth
                        onChange={searchChange}
                    />
                    <HStack gap="10">
                        <ArticleSortSelector className={cls.field} value={sort} onChange={sortChange} />
                        <ArticleOrderSelector className={cls.field} value={order} onChange={orderChange} />
                    </HStack>
                    <ArticleTypeChips value={type} onChange={typeChange} />
                </VStack>
            }
            on={
                <Card className={classNames(cls.ArticlesFiltersRedesigned, {}, [className])}>
                    <VStack gap="32" maxWidth>
                        <Input
                            isLoading={isLoading}
                            placeholder={t('Search')}
                            value={search}
                            fullWidth
                            onChange={searchChange}
                        />
                        <ArticleTypeChips value={type} onChange={typeChange} />
                        <VStack gap="8">
                            <Text text={`${t('Sort by')}:`} />
                            <ArticleSortSelector className={cls.field} value={sort} onChange={sortChange} />
                            <ArticleOrderSelector
                                className={cls.field}
                                value={order}
                                onChange={orderChange}
                            />
                        </VStack>
                    </VStack>
                </Card>
            }
        />
    );
};

const Memoized = memo(ArticlesFilters);

export { Memoized as ArticlesFilters };
