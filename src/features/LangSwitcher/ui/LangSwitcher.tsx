import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/redesigned/Button';

import cls from './LangSwitcher.module.scss';
import '../i18n/i18n';

interface LangSwitcherProps {
    className?: string;
}

const TranslateSwitcher = (props: LangSwitcherProps) => {
    const { className } = props;

    const { t, i18n } = useTranslation('LangSwitcher');

    function toggleTranslate() {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    }

    return (
        <Button
            className={classNames(cls.LangSwitcher, {}, [className])}
            theme="clear"
            onClick={toggleTranslate}
        >
            <span className={cls.text}>{t('lang')}</span>
        </Button>
    );
};

const Memoized = memo(TranslateSwitcher);

export { Memoized as TranslateSwitcher };
