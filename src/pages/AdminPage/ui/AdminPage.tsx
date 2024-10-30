import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';

import cls from './AdminPage.module.scss';
import '../i18n/i18n';

interface AdminPageProps {
    className?: string;
}

const AdminPage = (props: AdminPageProps) => {
    const { className } = props;
    const { t } = useTranslation('AdminPage');

    return (
        <Page className={classNames(cls.AdminPage, {}, [className])} data-testid="admin-page">
            <div className="title">{t('title')}</div>
        </Page>
    );
};

export default memo(AdminPage);
