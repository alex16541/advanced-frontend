import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getAuthData } from '@/entity/User';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getFeatureFlag } from '@/shared/lib/features';
import { updateFeatureFlags } from '@/shared/lib/features/services/updateFeatureFlags';
import { ListBoxOption, ListBox } from '@/shared/ui/redesigned/Popups';

import cls from './UiDesigneSwitcher.module.scss';

type DesigneVariant = 'old' | 'new';

interface UiDesigneSwitcherProps {
    className?: string;
}

const UiDesigneSwitcher = (props: UiDesigneSwitcherProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const authData = useAppSelector(getAuthData);
    const dispatch = useAppDispatch();
    const isAppRedesigned = getFeatureFlag('isRedesignedApp');
    const [isLoading, setIsLoading] = useState(false);

    const items: ListBoxOption<DesigneVariant>[] = [
        { value: 'old', content: t('Old') },
        { value: 'new', content: t('New') },
    ];

    const onChange = useCallback(
        async (value: DesigneVariant) => {
            if (!authData?.id) return;

            setIsLoading(true);

            await dispatch(
                updateFeatureFlags({
                    userId: authData.id,
                    featureFlags: {
                        isRedesignedApp: value === 'new',
                    },
                }),
            ).unwrap();

            setIsLoading(false);
        },
        [authData?.id, dispatch],
    );

    return (
        <ListBox
            className={classNames(cls.UiDesigneSwitcher, {}, [className])}
            disabled={isLoading}
            options={items}
            value={isAppRedesigned ? 'new' : 'old'}
            onChange={onChange}
        />
    );
};

const Memoized = memo(UiDesigneSwitcher);

export { Memoized as UiDesigneSwitcher };
