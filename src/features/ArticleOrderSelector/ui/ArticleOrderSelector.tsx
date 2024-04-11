import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { FeatureToggle } from '@/shared/lib/features/components/FeatureToggle/FeatureToggle';
import { SortOrder } from '@/shared/types/sort';
import { ListBox as ListBoxDeprecated, ListBoxOption } from '@/shared/ui/deprecated/Popups';
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
            <FeatureToggle
                feature="isRedesignedApp"
                off={
                    <ListBoxDeprecated
                        classNameWrapper={cls.field}
                        label={t('Sort by')}
                        options={orderOptions}
                        value={value}
                        onChange={onChange}
                    />
                }
                on={
                    <ListBox
                        classNameWrapper={cls.field}
                        options={orderOptions}
                        size="s"
                        value={value}
                        onChange={onChange}
                    />
                }
            />
        </div>
    );
};

const Memoized = memo(ArticleOrderSelector);

export { Memoized as ArticleOrderSelector };
