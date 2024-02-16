import { classNames } from 'shared/lib/classNames/classNames';
import { ReactNode, memo } from 'react';
import cls from './Flex.module.scss';

const FlexAlignClassNames = {
    Start: 'AlignStart',
    Center: 'AlignCenter',
    End: 'AlignEnd',
};

const FlexJustifyClassNames = {
    Start: 'JustifyStart',
    Center: 'JustifyCenter',
    End: 'JustifyEnd',
    SpaceBetween: 'JustifySpaceBetween',
};

const FlexDirectionClassNames = {
    Row: 'DirectionRow',
    Column: 'DirectionColumn',
};

const FlexGapClassNames = {
    2: 'Gap2',
    4: 'Gap4',
    6: 'Gap6',
    8: 'Gap8',
    10: 'Gap10',
    12: 'Gap12',
    14: 'Gap14',
    16: 'Gap16',
    18: 'Gap18',
    20: 'Gap20',
    24: 'Gap24',
    28: 'Gap28',
    32: 'Gap32',
};

type FlexAlign = 'Start' | 'Center' | 'End';
type FlexJustify = 'Start' | 'Center' | 'End' | 'SpaceBetween';
type FlexDirection = 'Row' | 'Column';
type FlexGap = '2' | '4' | '6' | '8' | '10' | '12' | '14' | '16' | '18' | '20' | '24' | '28' | '32';

export interface FlexProps {
    className?: string;
    align?: FlexAlign;
    justify?: FlexJustify;
    direction?: FlexDirection;
    max?: boolean;
    gap?: FlexGap;
    children?: ReactNode
}

const Flex = (props: FlexProps) => {
    const {
        className,
        align = 'Center',
        justify = 'Center',
        direction = 'Row',
        gap = '4',
        max = false,
        children,
    } = props;

    const mods = {
        [cls.FullWidth]: max,
    };

    const classes = [
        className,
        cls[FlexAlignClassNames[align]],
        cls[FlexJustifyClassNames[justify]],
        cls[FlexDirectionClassNames[direction]],
        cls[FlexGapClassNames[gap]],
    ];

    return (
        <div className={classNames(cls.Flex, mods, classes)}>
            {children}
        </div>
    );
};

const Memoized = memo(Flex);

export { Memoized as Flex };
