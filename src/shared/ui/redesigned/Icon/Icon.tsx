import { SVGAttributes, memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Icon.module.scss';

type SvgProps = Omit<SVGAttributes<SVGElement>, 'onClick'>;

interface IconBaseProps extends SvgProps {
    className?: string;
    dataTestid?: string;
    Svg: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
}

interface ClickableIconProps extends IconBaseProps {
    clickable: true;
    onClick: () => void;
}

interface NonClickableIconProps extends IconBaseProps {
    clickable?: false;
}

type IconProps = ClickableIconProps | NonClickableIconProps;

const Icon = (props: IconProps) => {
    const { className, Svg, clickable, dataTestid, ...otherProps } = props;

    if (clickable) {
        const { onClick } = props;

        return (
            <button
                className={classNames(cls.Icon, {}, [className])}
                data-testid={dataTestid}
                type="button"
                onClick={onClick}
            >
                <Svg className={cls.wrappedIcon} {...otherProps} onClick={undefined} />
            </button>
        );
    }

    return <Svg className={classNames(cls.Icon, {}, [className])} data-testid={dataTestid} {...otherProps} />;
};

const Memoized = memo(Icon);

export { Memoized as Icon };
