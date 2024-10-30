import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Page } from '@/widgets/Page';
import { UiDesigneSwitcher } from '@/widgets/UiDesigneSwitcher';

import cls from './SettingsPage.module.scss';
import '../i18n/i18n';

interface SettingsPageProps {
    className?: string;
}

export const SettingsPage = (props: SettingsPageProps) => {
    const { className } = props;
    const { t } = useTranslation('SettingsPage');

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
