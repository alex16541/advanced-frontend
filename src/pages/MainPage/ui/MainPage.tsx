import { useTranslation } from 'react-i18next';
// eslint-disable-next-line alex16541-fsd-imports-path-checker/layers-imports
import { BugButton } from '@/app/providers/ErrorBoundary';
import { Page } from '@/widgets/Page';
import { Text } from '@/shared/ui/Text';

const MainPage = () => {
    const { t } = useTranslation();

    return (
        <Page className="page">
            <div className="title">{t('main page title')}</div>
            <Text
                text="test Lorem ipsum dolor
                sit amet consectetur adipisicing
                elit. Numquam, quidem?"
            />
            <BugButton />
        </Page>
    );
};

export default MainPage;
