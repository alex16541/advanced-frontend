import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/redesigned/Button';

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
            <Button onClick={reloadPage}>{t('reload page')}</Button>
        </div>
    );
};
