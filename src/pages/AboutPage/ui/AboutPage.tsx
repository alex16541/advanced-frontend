import { useTranslation } from "react-i18next";
import { Button, ButtonThemes } from "shared/ui/Button";

const AboutPage = () => {
    const { t } = useTranslation();

    return (
        <div>
            <div>{t('about-page-title')}</div>
        </div>
    )
}

export default AboutPage;