import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page';

const AboutPage = () => {
    const { t } = useTranslation();

    return (
        <Page>
            <div className="title">{t('about page title')}</div>
        </Page>
    );
};

export default AboutPage;
