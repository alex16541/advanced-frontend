import { classNames } from 'shared/lib/classNames/classNames';
import LoaderSvg from 'shared/assets/svg/loader.svg';
import cls from './Loader.module.scss';

interface LoaderProps {
  className?: string;
}

export const Loader = (props: LoaderProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.Loader, {}, [className])}>
            <LoaderSvg className={classNames(cls.LoaderSvg)} />
        </div>
    );
};
