import { useTranslation } from 'react-i18next';

// eslint-disable-next-line alex16541-fsd-imports-path-checker/layers-imports
import { BugButton } from '@/app/providers/ErrorBoundary';
import { Counter } from '@/entity/Counter';
import { getFeatureFlag } from '@/shared/lib/features';
import { Text } from '@/shared/ui/Text';
import { Page } from '@/widgets/Page';

const MainPage = () => {
    const { t } = useTranslation();
    const isCounterEnables = getFeatureFlag('isCounterEnabled');

    return (
        <Page className="page" data-testid="main-page">
            <div className="title">{t('main page title')}</div>
            <Text
                text="test Lorem ipsum dolor
                sit amet consectetur adipisicing
                elit. Numquam, quidem?"
            />
            <BugButton />

            {isCounterEnables && <Counter />}
        </Page>
    );
};

export default MainPage;
