import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Page } from '@/widgets/Page';
import { UiDesigneSwitcher } from '@/widgets/UiDesigneSwitcher';

import cls from './SettingsPage.module.scss';

interface SettingsPageProps {
    className?: string;
}

const SettingsPage = (props: SettingsPageProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <Page className={classNames(cls.SettingsPage, {}, [className])}>
            <VStack className={cls.content} gap="12">
                <Text title={t('Settings')} />
                <Text text={`${t('Select design')}:`} />
                <UiDesigneSwitcher />
            </VStack>
        </Page>
    );
};

const Memoized = memo(SettingsPage);

export { Memoized as SettingsPage };
