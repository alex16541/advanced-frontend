import LoaderSvg from '@/shared/assets/svg/loader.svg';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Loader.module.scss';

interface LoaderProps {
    className?: string;
}

/**
 * Используйте соответствующий компонент из папки refactoring
 * @deprecated
 */
export const Loader = (props: LoaderProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.Loader, {}, [className])}>
            <LoaderSvg className={classNames(cls.LoaderSvg)} />
        </div>
    );
};
