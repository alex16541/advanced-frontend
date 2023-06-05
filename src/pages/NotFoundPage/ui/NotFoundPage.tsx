import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'shared/ui/Page/Page';
import cls from './NotFoundPage.module.scss';

export const NotFoundPage = () => <Page className={classNames(cls.NotFoundPage, {}, [])}>404</Page>;
