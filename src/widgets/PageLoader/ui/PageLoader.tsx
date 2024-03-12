import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Loader } from '@/shared/ui/Loader';
import { Text } from '@/shared/ui/Text';
import cls from './PageLoader.module.scss';

interface PageLoaderProps {
    className?: string;
    text?: string;
}

export const PageLoader = (props: PageLoaderProps) => {
    const { className, text } = props;
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.PageLoader, {}, [className])}>
            <Loader />
            <Text text={text || t('page loader text')} />
        </div>
    );
};
