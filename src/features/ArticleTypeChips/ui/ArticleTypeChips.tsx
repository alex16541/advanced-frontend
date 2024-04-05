import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { FeatureToggle } from '@/shared/lib/features/FeatureToggle/FeatureToggle';
import { ChipList as ChipListDeprecated } from '@/shared/ui/deprecated/Chip';
import { ChipList } from '@/shared/ui/redesigned/Chip';

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
        <FeatureToggle
            feature="isRedesignedApp"
            off={
                <div className={classNames(cls.ArticleTypeChips, {}, [className])}>
                    {value && (
                        <ChipListDeprecated
                            options={ArticleTypeChipOptions}
                            value={value}
                            onClick={onChange}
                        />
                    )}
                </div>
            }
            on={
                <div className={classNames(cls.ArticleTypeChipsRedesigned, {}, [className])}>
                    {value && (
                        <ChipList
                            direction="Column"
                            options={ArticleTypeChipOptions}
                            value={value}
                            onClick={onChange}
                        />
                    )}
                </div>
            }
        />
    );
};

const Memoized = memo(ArticleTypeChips);

export { Memoized as ArticleTypeChips };
