import { classNames } from 'shared/lib/classNames/classNames';
import { Loader } from 'shared/ui/Loader';
import cls from './NotFoundPage.module.scss';

export const NotFoundPage = () => (
    <div className={classNames(cls.notFoundPage, {}, [])}>
        <Loader />
    </div>
);
