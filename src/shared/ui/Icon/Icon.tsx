import { SVGAttributes, memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Icon.module.scss';

interface IconProps extends SVGAttributes<SVGElement>{
    className?: string;
    Svg: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
}

const Icon = (props: IconProps) => {
    const { className, Svg, ...otherProps } = props;

    return <Svg className={classNames(cls.Icon, {}, [className])} {...otherProps} />;
};

const Memoized = memo(Icon);

export { Memoized as Icon };
