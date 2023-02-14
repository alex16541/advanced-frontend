import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Loader } from 'shared/ui/Loader';
import cls from './PageLoader.module.scss';

interface PageLoaderProps {
    className?: string;
}

export const PageLoader = (props: PageLoaderProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.PageLoader, {}, [className])}>
            <Loader />
            <p>{t('page-loader-text')}</p>
        </div>
    );
};
