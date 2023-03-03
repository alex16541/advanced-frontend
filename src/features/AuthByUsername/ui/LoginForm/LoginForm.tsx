import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string;
}

export const LoginForm = (props: LoginFormProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <span className={cls.title}>{t('authorization')}</span>
            <div className={cls.inputs}>
                <Input className={cls.input} placeholder={t('username')} autoFocus />
                <Input className={cls.input} placeholder={t('password')} />
            </div>
            <Button className={cls.btn}>{t('login')}</Button>
        </div>
    );
};
