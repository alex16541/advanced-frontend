import { ReactNode, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Flex.module.scss';
import {
    FlexAlign, FlexDirection, FlexGap, FlexJustify, HTMLDivElementType,
} from '../model/types';

const FlexAlignClassNames: Record<FlexAlign, string> = {
    Start: cls.AlignStart,
    Center: cls.AlignCenter,
    End: cls.AlignEnd,
    Stretch: cls.AlignStretch,
};

const FlexJustifyClassNames: Record<FlexJustify, string> = {
    Start: cls.JustifyStart,
    Center: cls.JustifyCenter,
    End: cls.JustifyEnd,
    SpaceBetween: cls.JustifySpaceBetween,
};

const FlexDirectionClassNames: Record<FlexDirection, string> = {
    Row: cls.DirectionRow,
    Column: cls.DirectionColumn,
};

const FlexGapClassNames: Record<FlexGap, string> = {
    2: cls.Gap2,
    4: cls.Gap4,
    6: cls.Gap6,
    8: cls.Gap8,
    10: cls.Gap10,
    12: cls.Gap12,
    14: cls.Gap14,
    16: cls.Gap16,
    18: cls.Gap18,
    20: cls.Gap20,
    24: cls.Gap24,
    28: cls.Gap28,
    32: cls.Gap32,
};

export interface FlexProps extends HTMLDivElementType {
    className?: string;
    align?: FlexAlign;
    justify?: FlexJustify;
    direction?: FlexDirection;
    max?: boolean;
    gap?: FlexGap;
    children?: ReactNode
}

export const Flex = (props: FlexProps) => {
    const {
        className,
        align = 'Center',
        justify = 'Center',
        direction = 'Row',
        gap = '4',
        max = false,
        children,
        ...divProps
    } = props;

    const mods = {
        [cls.FullWidth]: max,
    };

    const classes = [
        className,
        FlexAlignClassNames[align],
        FlexJustifyClassNames[justify],
        FlexDirectionClassNames[direction],
        FlexGapClassNames[gap],
    ];

    return (
        <div className={classNames(cls.Flex, mods, classes)} {...divProps}>
            {children}
        </div>
    );
};
