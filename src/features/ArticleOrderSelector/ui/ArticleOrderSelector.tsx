import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { SortOrder } from '@/shared/types/sort';
import { ListBox, ListBoxOption } from '@/shared/ui/deprecated/Popups';

import cls from './ArticleOrderSelector.module.scss';

const orderOptions: ListBoxOption<SortOrder>[] = [
    { value: 'asc', content: 'возрастанию' },
    { value: 'desc', content: 'убыванию' },
];

interface ArticleOrderSelectorProps {
    className?: string;
    onChange?: (order: SortOrder) => void;
    value?: SortOrder;
}

const ArticleOrderSelector = (props: ArticleOrderSelectorProps) => {
    const { className, onChange, value } = props;
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.ArticleOrderSelector, {}, [className])}>
            <ListBox
                classNameWrapper={cls.field}
                label={t('Sort by')}
                options={orderOptions}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

const Memoized = memo(ArticleOrderSelector);

export { Memoized as ArticleOrderSelector };
