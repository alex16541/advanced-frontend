import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';

import cls from './NotFoundPage.module.scss';

export const NotFoundPage = () => (
    <Page
        className={classNames(cls.NotFoundPage, {}, [])}
        data-testid="not-found-page"
    >
        404
    </Page>
);
