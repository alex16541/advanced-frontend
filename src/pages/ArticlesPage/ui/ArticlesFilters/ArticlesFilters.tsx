import { memo } from 'react';

import { ArticleOrderSelector } from '@/features/ArticleOrderSelector';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeChips } from '@/features/ArticleTypeChips';
import SearchIcon from '@/shared/assets/svg/search.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Input } from '@/shared/ui/redesigned/Input';
import { VStack } from '@/shared/ui/redesigned/Stack';
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
        <Card className={classNames(cls.ArticlesFilters, {}, [className])}>
            <VStack gap="32" maxWidth>
                <Input
                    addonLeft={<Icon Svg={SearchIcon} />}
                    className={cls.search}
                    isLoading={isLoading}
                    placeholder={t('Find')}
                    size="s"
                    value={search}
                    fullWidth
                    onChange={searchChange}
                />
                <ArticleTypeChips direction="Column" value={type} withAll onClick={typeChange} />
                <VStack gap="8">
                    <Text text={`${t('Sort by')}:`} />
                    <ArticleSortSelector className={cls.field} value={sort} onChange={sortChange} />
                    <ArticleOrderSelector className={cls.field} value={order} onChange={orderChange} />
                </VStack>
            </VStack>
        </Card>
    );
};

const Memoized = memo(ArticlesFilters);

export { Memoized as ArticlesFilters };
