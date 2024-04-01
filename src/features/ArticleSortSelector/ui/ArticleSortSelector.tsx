import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleSortField } from '@/entity/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ListBox, ListBoxOption } from '@/shared/ui/deprecated/Popups';

import cls from './ArticleSortSelector.module.scss';

const sortOptions: ListBoxOption<ArticleSortField>[] = [
    { value: ArticleSortField.CREATED, content: 'дате создания' },
    { value: ArticleSortField.TITLE, content: 'названию' },
    { value: ArticleSortField.VIEWS, content: 'просмотрам' },
];

interface ArticleSortSelectorProps {
    className?: string;
    onChange?: (sort: ArticleSortField) => void;
    value?: ArticleSortField;
}

const ArticleSortSelector = (props: ArticleSortSelectorProps) => {
    const { className, onChange, value } = props;
    const { t } = useTranslation();
    return (
        <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
            <ListBox
                classNameWrapper={cls.field}
                label={t('Sort by')}
                options={sortOptions}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

const Memoized = memo(ArticleSortSelector);

export { Memoized as ArticleSortSelector };
