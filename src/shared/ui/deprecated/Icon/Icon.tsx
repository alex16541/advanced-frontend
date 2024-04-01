import { SVGAttributes, memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Icon.module.scss';

interface IconProps extends SVGAttributes<SVGElement> {
    className?: string;
    Svg: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
}

/**
 * Используйте соответствующий компонент из папки refactoring
 * @deprecated
 */
const Icon = (props: IconProps) => {
    const { className, Svg, ...otherProps } = props;

    return <Svg className={classNames(cls.Icon, {}, [className])} {...otherProps} />;
};

/**
 * Используйте соответствующий компонент из папки refactoring
 * @deprecated
 */
const Memoized = memo(Icon);

export { Memoized as Icon };
