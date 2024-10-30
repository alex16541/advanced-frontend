import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';

import { useJsonSettings, changeUserJsonSettings } from '@/entity/User';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Text } from '@/shared/ui/redesigned/Text';

import '../i18n/i18n';

export const ArticlesPageGreeting = () => {
    const { t } = useTranslation('ArticlePageGreeting');
    const [isOpen, setIsOpen] = useState(false);
    const { isArticlesPageGreetingShown: isModalShown } = useJsonSettings();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isModalShown) {
            setIsOpen(true);
            dispatch(changeUserJsonSettings({ isArticlesPageGreetingShown: true }));
        }
    }, [dispatch, isModalShown]);

    const onClose = () => {
        setIsOpen(false);
    };

    const text = <Text text={t('text')} title={t('title')} />;

    if (isMobile) {
        return (
            <Drawer isOpen={isOpen} onClose={onClose}>
                {text}
            </Drawer>
        );
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            {text}
        </Modal>
    );
};
