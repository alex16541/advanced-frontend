import {
    memo, useCallback, useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Input } from '@/shared/ui/Input';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { Card } from '@/shared/ui/Card/Card';
import { Loader } from '@/shared/ui/Loader';
import { articlesPageActions } from '../../model/slices/articlesPageSlice';
import { selectArticlesFiltersSearch } from '../../model/selectors/articlesFiltersSlice';
import cls from './ArticlesFiltersSearch.module.scss';

interface ArticlesFiltersSearchProps {
    className?: string;
    isLoading?: boolean;
    onSearch?: () => void;
}

const ArticlesFiltersSearch = (props: ArticlesFiltersSearchProps) => {
    const { className, isLoading, onSearch } = props;
    const { t } = useTranslation('article');
    const dispatch = useAppDispatch();
    const search = useAppSelector(selectArticlesFiltersSearch);

    const onChange = useCallback(
        (str: string) => {
            dispatch(articlesPageActions.setSearch(str));
            onSearch?.();
        },
        [dispatch, onSearch],
    );

    const content = useMemo(() => {
        // TODO: Вынести лоадер внутрь инпута
        if (isLoading) {
            return <Loader className={cls.loader} />;
        }

        return <Input placeholder={t('Search')} value={search} onChange={onChange} />;
    }, [isLoading, t, search, onChange]);

    return (
        <Card className={classNames(cls.ArticlesFiltersSearch, {}, [className])}>{content}</Card>
    );
};

const Memoized = memo(ArticlesFiltersSearch);

export { Memoized as ArticlesFiltersSearch };
