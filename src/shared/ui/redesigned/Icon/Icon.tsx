import { SVGAttributes, memo, forwardRef, ForwardedRef } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Icon.module.scss';

type SvgProps = Omit<SVGAttributes<SVGElement>, 'onClick' | 'onMouseDown'>;
export type SvgType = React.FunctionComponent<
    React.SVGAttributes<SVGElement> & { ref?: React.Ref<SVGElement> }
>;
interface IconBaseProps extends SvgProps {
    className?: string;
    dataTestid?: string;
    Svg: SvgType;
}

interface ClickableIconProps extends IconBaseProps {
    clickable: true;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onMouseDown?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

interface NonClickableIconProps extends IconBaseProps {
    clickable?: false;
}

type IconProps = ClickableIconProps | NonClickableIconProps;

const Icon = forwardRef<SVGSVGElement | HTMLButtonElement, IconProps>((props, ref) => {
    const { className, Svg, clickable, dataTestid, 'aria-label': label, ...otherProps } = props;

    if (clickable) {
        const { onClick, onMouseDown } = props;

        return (
            <button
                aria-label={label}
                className={classNames(cls.Icon, {}, [className])}
                data-testid={dataTestid}
                ref={ref as ForwardedRef<HTMLButtonElement>}
                type="button"
                onClick={onClick}
                onMouseDown={onMouseDown}
            >
                <Svg
                    className={cls.wrappedIcon}
                    {...otherProps}
                    onClick={undefined}
                    onMouseDown={undefined}
                />
            </button>
        );
    }

    return (
        <Svg
            className={classNames(cls.Icon, {}, [className])}
            data-testid={dataTestid}
            ref={ref as ForwardedRef<SVGElement>}
            {...otherProps}
            onClick={undefined}
            onMouseDown={undefined}
        />
    );
});

const Memoized = memo(Icon);

export { Memoized as Icon };
