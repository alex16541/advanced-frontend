import { useTranslation } from 'react-i18next';

import { Page } from '@/widgets/Page';

import '../i18n/i18n';

const AboutPage = () => {
    const { t } = useTranslation('AboutPage');

    return (
        <Page>
            <div className="title">{t('title')}</div>
        </Page>
    );
};

export default AboutPage;
