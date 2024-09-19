import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { SortOrder } from '@/shared/types/sort';
import { ListBoxOption } from '@/shared/ui/deprecated/Popups';
import { ListBox } from '@/shared/ui/redesigned/Popups';

import cls from './ArticleOrderSelector.module.scss';

const orderOptions: ListBoxOption<SortOrder>[] = [
    { value: 'asc', content: 'Возрастанию' },
    { value: 'desc', content: 'Убыванию' },
];

interface ArticleOrderSelectorProps {
    className?: string;
    onChange?: (order: SortOrder) => void;
    value?: SortOrder;
}

const ArticleOrderSelector = (props: ArticleOrderSelectorProps) => {
    const { className, onChange, value } = props;
    const { t } = useTranslation('article');

    return (
        <div className={classNames(cls.ArticleOrderSelector, {}, [className])}>
            
                                <ListBox
                                    classNameWrapper={cls.field}
                                    options={orderOptions}
                                    size="s"
                                    value={value}
                                    onChange={onChange}
                                />
                            
        </div>
    );
};

const Memoized = memo(ArticleOrderSelector);

export { Memoized as ArticleOrderSelector };
