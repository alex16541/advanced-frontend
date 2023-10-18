import { BugButton } from 'app/providers/ErrorBoundary';
import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page';
import { Text } from 'shared/ui/Text/Text';

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
