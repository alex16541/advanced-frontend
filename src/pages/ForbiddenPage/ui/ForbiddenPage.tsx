import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';

import cls from './ForbiddenPage.module.scss';

export const ForbiddenPage = () => <Page className={classNames(cls.ForbiddenPage, {}, [])}>403</Page>;
