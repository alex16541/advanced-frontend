import { memo, useCallback, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';

import { useJsonSettings, changeUserJsonSettings } from '@/entity/User';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { Drawer } from '@/shared/ui/Drawer';
import { Modal } from '@/shared/ui/Modal';
import { Text } from '@/shared/ui/Text';

const ArticlesPageGreeting = () => {
    const { t } = useTranslation('article');
    const [isOpen, setIsOpen] = useState(false);
    const { isArticlesPageGreetingShown: isModalShown } = useJsonSettings();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isModalShown) {
            setIsOpen(true);
            dispatch(changeUserJsonSettings({ isArticlesPageGreetingShown: true }));
        }
    }, [dispatch, isModalShown]);

    const onClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    const text = <Text text={t('Greeting text')} title={t('Greeting title')} />;

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

const Memoized = memo(ArticlesPageGreeting);

export { Memoized as ArticlesPageGreeting };
