import { useTranslation } from 'react-i18next';

import { StikyHeaderLayout } from '@/shared/layouts/StikyHeaderLayout';
import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text';
import { Page } from '@/widgets/Page';

import cls from './AboutPage.module.scss';
import '../i18n/i18n';

const AboutPage = () => {
    const { t } = useTranslation('AboutPage');

    return (
        <Page>
            <StikyHeaderLayout
                header={<Text text={t('title')} weight="bold" />}
                content={
                    <Card className={cls.welcomeCard}>
                        <Text title={t('welcome title')} />
                        <br />
                        <Text text={t('welcome text 1')} />
                        <br />
                        <Text text={t('welcome dot 1')} />
                        <Text text={t('welcome dot 2')} />
                        <Text text={t('welcome dot 3')} />
                        <br />
                        <Text text={t('welcome text 2')} />
                    </Card>
                }
            />
        </Page>
    );
};

export default AboutPage;
