import { useTranslation } from 'react-i18next';

const AboutPage = () => {
    const { t } = useTranslation();

    return (
        <div>
            <div className="title">{t('about page title')}</div>
        </div>
    );
};

export default AboutPage;
