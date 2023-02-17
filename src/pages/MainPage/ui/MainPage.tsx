import { BugButton } from 'app/providers/ErrorBoundary';
import { useTranslation } from 'react-i18next';

const MainPage = () => {
    const { t } = useTranslation();

    function onThrow() {
        throw new Error();
    }

    return (
        <div className="page">
            <div className="title">{t('main-page-title')}</div>

            <BugButton />
        </div>
    );
};

export default MainPage;
