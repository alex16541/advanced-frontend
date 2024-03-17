import { useTranslation } from 'react-i18next';

// eslint-disable-next-line alex16541-fsd-imports-path-checker/layers-imports
import { BugButton } from '@/app/providers/ErrorBoundary';
import { Counter } from '@/entity/Counter';
import { Text } from '@/shared/ui/Text';
import { Page } from '@/widgets/Page';

const MainPage = () => {
    const { t } = useTranslation();

    return (
        <Page className="page" data-testid="main-page">
            <div className="title">{t('main page title')}</div>
            <Text
                text="test Lorem ipsum dolor
                sit amet consectetur adipisicing
                elit. Numquam, quidem?"
            />
            <BugButton />

            <Counter />
        </Page>
    );
};

export default MainPage;
