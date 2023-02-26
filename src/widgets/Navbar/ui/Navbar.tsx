import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkThemes } from 'shared/ui/AppLink/AppLink';
import { Button, ButtonThemes } from 'shared/ui/Button';
import { Modal } from 'shared/ui/Modal';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = (props: NavbarProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <nav className={cls.links}>
                <div>/</div>
                <Button
                    theme={ButtonThemes.PRIMARY}
                    onClick={() => setIsAuthModal(true)}
                >
                    {t('login')}
                </Button>
                <Modal
                    isOpen={isAuthModal}
                    onClose={() => setIsAuthModal(false)}
                >
                    <div>
                        test lorem ipsum dolor sit amet,
                        consectetur adipisicing elit.
                        Perspiciatis ipsa similique ipsum saepe
                        assumenda aliquam eaque fugiat quasi
                        voluptatem facere.
                    </div>
                </Modal>
            </nav>
        </div>
    );
};
