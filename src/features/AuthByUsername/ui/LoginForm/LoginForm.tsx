import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, memo, FC } from 'react';
import { Text, TextAlign, TextThemes } from 'shared/ui/Text/Text';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions } from '../../model/slices/loginSlice';
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string;
}

export const LoginForm: FC<LoginFormProps> = memo((props: LoginFormProps) => {
    const { className = '' } = props;
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const {
        username, password, isLoading, error,
    } = useSelector(getLoginState);

    const onChangeUsername = useCallback((username: string) => {
        dispatch(loginActions.setUsername(username));
    }, [dispatch]);

    const onChangePassword = useCallback((password: string) => {
        dispatch(loginActions.setPassword(password));
    }, [dispatch]);

    const onLoginClick = useCallback(() => {
        dispatch(loginByUsername({ username, password }));
    }, [dispatch, username, password]);

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <Text className={cls.title} align={TextAlign.CENTER} title={t('authorization')} />
            <div className={cls.inputs}>
                <Input
                    className={cls.input}
                    value={username}
                    onChange={onChangeUsername}
                    placeholder={t('username')}
                    autoFocus
                />
                <Input
                    className={cls.input}
                    value={password}
                    type="password"
                    onChange={onChangePassword}
                    placeholder={t('password')}
                />
            </div>
            <Button
                className={cls.btn}
                onClick={onLoginClick}
                disabled={isLoading}
            >
                {t('login')}
            </Button>
            {error !== undefined && (
                <Text
                    className={cls.errorMsg}
                    theme={TextThemes.ERROR}
                    text={error === 0 ? t('wrong-login-or-password') : t('unknow-auth-error')}
                />
            )}
        </div>
    );
});
