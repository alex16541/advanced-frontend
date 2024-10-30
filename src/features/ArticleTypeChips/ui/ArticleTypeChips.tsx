import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ChipList } from '@/shared/ui/redesigned/Chip';
import { FlexDirection } from '@/shared/ui/redesigned/Stack/Flex/model/types';

import { ArticleTypeChipOptions } from '../model/consts/articleTypeChips';
import { ArticleTypeChip } from '../model/types/articleTypeChips';

import cls from './ArticleTypeChips.module.scss';

import '../i18n/i18n';

interface ArticleTypeChipsProps {
    className?: string;
    value?: ArticleTypeChip | ArticleTypeChip[];
    onChange?: (chips: ArticleTypeChip[]) => void;
    onClick?: (chip: ArticleTypeChip) => void;
    multiselect?: boolean;
    direction?: FlexDirection;
    withAll?: boolean;
}

export const ArticleTypeChips = (props: ArticleTypeChipsProps) => {
    const { className, value, onChange, multiselect, onClick, direction = 'Row', withAll } = props;
    const { t } = useTranslation('ArticleTypeChips');

    const options = withAll ? ArticleTypeChipOptions : [...ArticleTypeChipOptions.slice(1)];

    return (
        <div className={classNames(cls.ArticleTypeChips, {}, [className])}>
            {value && (
                <ChipList
                    direction={direction}
                    multiselect={multiselect}
                    options={options}
                    tLabel={t}
                    value={value}
                    onChange={onChange}
                    onClick={onClick}
                />
            )}
        </div>
    );
};
