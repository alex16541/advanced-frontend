import { useTranslation } from 'react-i18next';

// eslint-disable-next-line alex16541-fsd-imports-path-checker/layers-imports
import { StikyContentLayout } from '@/shared/layouts/StikyContentLayout';
import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text';
import { Page } from '@/widgets/Page';

import cls from './MainPage.module.scss';

const MainPage = () => {
    const { t } = useTranslation();
    return (
        <Page className="page" data-testid="main-page">
            <StikyContentLayout
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

export default MainPage;
