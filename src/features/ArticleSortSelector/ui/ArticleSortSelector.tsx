import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleSortField } from '@/entity/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ListBoxOption } from '@/shared/ui/deprecated/Popups';
import { ListBox } from '@/shared/ui/redesigned/Popups';

import cls from './ArticleSortSelector.module.scss';
import '../i18n/i18n';

interface ArticleSortSelectorProps {
    className?: string;
    onChange?: (sort: ArticleSortField) => void;
    value?: ArticleSortField;
}

const ArticleSortSelector = (props: ArticleSortSelectorProps) => {
    const { className, onChange, value } = props;
    const { t } = useTranslation('ArticleSort');

    const sortOptions: ListBoxOption<ArticleSortField, string>[] = [
        { value: ArticleSortField.CREATED, content: t('SORT_CREATED_AT') },
        { value: ArticleSortField.TITLE, content: t('SORT_TITLE') },
        { value: ArticleSortField.VIEWS, content: t('SORT_VIEWS') },
    ];
    return (
        <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
            <ListBox
                classNameWrapper={cls.field}
                options={sortOptions}
                size="s"
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

const Memoized = memo(ArticleSortSelector);

export { Memoized as ArticleSortSelector };
