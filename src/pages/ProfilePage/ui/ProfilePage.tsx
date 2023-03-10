import { useTranslation } from 'react-i18next';

const ProfilePage = () => {
    const { t } = useTranslation();

    return (
        <div>
            <div className="title">{t('your profile page title')}</div>
        </div>
    );
};

export default ProfilePage;
