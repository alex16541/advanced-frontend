import { useTranslation } from "react-i18next";

const MainPage = () => {
    const { t } = useTranslation();
    return (
        <div className="page">
            <div>{t('main-page-title')}</div>
        </div>
    );
}

export default MainPage;