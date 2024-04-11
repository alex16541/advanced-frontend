import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { FeatureToggle } from '@/shared/lib/features/components/FeatureToggle/FeatureToggle';
import { Button as ButtonDeprecated, ButtonThemes } from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesigned/Button';

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
        <FeatureToggle
            feature="isRedesignedApp"
            off={
                <ButtonDeprecated
                    className={classNames(cls.LangSwitcher, {}, [className])}
                    theme={ButtonThemes.CLEAR}
                    onClick={toggleTranslate}
                >
                    {t('language')}
                </ButtonDeprecated>
            }
            on={
                <Button
                    className={classNames(cls.LangSwitcherRedesigned, {}, [className])}
                    theme="clear"
                    onClick={toggleTranslate}
                >
                    <span className={cls.text}>{t('language')}</span>
                </Button>
            }
        />
    );
};

const Memoized = memo(TranslateSwitcher);

export { Memoized as TranslateSwitcher };
