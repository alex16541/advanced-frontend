import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonThemes } from '@/shared/ui/deprecated/Button';

import cls from './LangSwitcher.module.scss';

interface LangSwitcherProps {
    className?: string;
}

const TranslateSwitcher = (props: LangSwitcherProps) => {
    const { className } = props;

    const { t, i18n } = useTranslation();

    function toggleTranslate() {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    }

    return (
        <Button
            className={classNames(cls.LangSwitcher, {}, [className])}
            theme={ButtonThemes.CLEAR}
            onClick={toggleTranslate}
        >
            {t('language')}
        </Button>
    );
};

const Memoized = memo(TranslateSwitcher);

export { Memoized as TranslateSwitcher };
