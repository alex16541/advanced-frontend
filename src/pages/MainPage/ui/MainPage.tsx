import { BugButton } from 'app/providers/ErrorBoundary';
import { Counter } from 'entities/Counter';
import { useTranslation } from 'react-i18next';

const MainPage = () => {
    const { t } = useTranslation();

    return (
        <div className="page">
            <div className="title">{t('main-page-title')}</div>
            <Counter />
            <BugButton />
        </div>
    );
};

export default MainPage;
