import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleSortField } from '@/entity/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { FeatureToggle } from '@/shared/lib/features/FeatureToggle/FeatureToggle';
import { ListBox as ListBoxDeprecated, ListBoxOption } from '@/shared/ui/deprecated/Popups';
import { ListBox } from '@/shared/ui/redesigned/Popups';

import cls from './ArticleSortSelector.module.scss';

const sortOptions: ListBoxOption<ArticleSortField>[] = [
    { value: ArticleSortField.CREATED, content: 'Дате создания' },
    { value: ArticleSortField.TITLE, content: 'Названию' },
    { value: ArticleSortField.VIEWS, content: 'Просмотрам' },
];

interface ArticleSortSelectorProps {
    className?: string;
    onChange?: (sort: ArticleSortField) => void;
    value?: ArticleSortField;
}

const ArticleSortSelector = (props: ArticleSortSelectorProps) => {
    const { className, onChange, value } = props;
    const { t } = useTranslation('article');
    return (
        <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
            <FeatureToggle
                feature="isRedesignedApp"
                off={
                    <ListBoxDeprecated
                        classNameWrapper={cls.field}
                        label={t('Sort by')}
                        options={sortOptions}
                        value={value}
                        onChange={onChange}
                    />
                }
                on={
                    <ListBox
                        classNameWrapper={cls.field}
                        options={sortOptions}
                        size="s"
                        value={value}
                        onChange={onChange}
                    />
                }
            />
        </div>
    );
};

const Memoized = memo(ArticleSortSelector);

export { Memoized as ArticleSortSelector };
