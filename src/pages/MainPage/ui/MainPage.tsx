import { useTranslation } from 'react-i18next';

// eslint-disable-next-line alex16541-fsd-imports-path-checker/layers-imports
import { StikyContentLayout } from '@/shared/layouts/StikyContentLayout';
import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text';
import { Page } from '@/widgets/Page';

import cls from './MainPage.module.scss';
import '../i18n/i18n';

const MainPage = () => {
    const { t } = useTranslation('MainPage');
    return (
        <Page className="page" data-testid="main-page">
            <StikyContentLayout
                content={
                    <Card className={cls.welcomeCard}>
                        <Text size="l" title={t('welcome title')} weight="bold" />
                        <br />
                        <Text text={t('welcome text 1')} />
                        <br />
                        <Text title={t('welcome subtitle 1')} weight="bold" />
                        <br />
                        <Text text={t('welcome dot 1')} />
                        <Text text={t('welcome dot 2')} />
                        <Text text={t('welcome dot 3')} />
                        <Text text={t('welcome dot 4')} />
                        <Text text={t('welcome dot 5')} />
                        <Text text={t('welcome dot 6')} />
                        <Text text={t('welcome dot 7')} />
                        <br />
                        <Text title={t('welcome subtitle 2')} weight="bold" />
                        <br />
                        <Text text={t('welcome dot 8')} />
                        <Text text={t('welcome dot 9')} />
                        <Text text={t('welcome dot 10')} />
                        <Text text={t('welcome dot 11')} />
                        <Text text={t('welcome dot 12')} />
                        <Text text={t('welcome dot 13')} />
                        <Text text={t('welcome dot 14')} />
                        <Text text={t('welcome dot 15')} />
                        <Text text={t('welcome dot 16')} />
                        <br />
                        <Text text={t('welcome text 2')} />
                    </Card>
                }
            />
        </Page>
    );
};

export default MainPage;
