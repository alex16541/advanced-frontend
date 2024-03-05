import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonThemes } from '@/shared/ui/Button';
import cls from './PageError.module.scss';

interface PageErrorProps {
    className?: string;
}

export const PageError = (props: PageErrorProps) => {
    const { className } = props;
    const { t } = useTranslation();

    function reloadPage() {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    }

    return (
        <div className={classNames(cls.PageError, {}, [className])}>
            {t('page logading error text')}
            <Button onClick={reloadPage} theme={ButtonThemes.PRIMARY}>
                {t('reload page')}
            </Button>
        </div>
    );
};
