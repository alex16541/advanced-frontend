import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import cls from './AdminPage.module.scss';

interface AdminPageProps {
    className?: string;
}

const AdminPage = (props: AdminPageProps) => {
    const { className } = props;
    const { t } = useTranslation('admin');

    return (
        <Page className={classNames(cls.AdminPage, {}, [className])}>
            <div className="title">{t('admin page')}</div>
        </Page>
    );
};

export default memo(AdminPage);
