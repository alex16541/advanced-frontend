import { classNames } from 'shared/lib/classNames/classNames';
import cls from './NotFoundPage.module.scss';

export const NotFoundPage = () => (
    <div className={classNames(cls.NotFoundPage, {}, [])}>
        404
    </div>
);
