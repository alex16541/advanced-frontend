import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ChipList } from '@/shared/ui/deprecated/Chip';

import { ArticleTypeChipOptions } from '../model/consts/articleTypeChips';
import { ArticleTypeChip } from '../model/types/articleTypeChips';

import cls from './ArticleTypeChips.module.scss';

interface ArticleTypeChipsProps {
    className?: string;
    value?: ArticleTypeChip;
    onChange?: (chip: ArticleTypeChip) => void;
}

const ArticleTypeChips = (props: ArticleTypeChipsProps) => {
    const { className, value, onChange } = props;

    return (
        <div className={classNames(cls.ArticleTypeChips, {}, [className])}>
            {value && <ChipList options={ArticleTypeChipOptions} value={value} onClick={onChange} />}
        </div>
    );
};

const Memoized = memo(ArticleTypeChips);

export { Memoized as ArticleTypeChips };
