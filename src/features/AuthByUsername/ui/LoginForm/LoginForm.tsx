import { useCallback, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Button } from '@/shared/ui/redesigned/Button';
import { Input } from '@/shared/ui/redesigned/Input';
import { Text } from '@/shared/ui/redesigned/Text';

import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from '../../model/slices/loginSlice';

import cls from './LoginForm.module.scss';

export interface LoginFormProps {
    className?: string;
    onSuccess?: () => void;
}

const initialReucers = { loginForm: loginReducer };

const LoginForm = memo((props: LoginFormProps) => {
    const { className, onSuccess } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const username = useAppSelector(getLoginUsername);
    const password = useAppSelector(getLoginPassword);
    const isLoading = useAppSelector(getLoginIsLoading);
    const error = useAppSelector(getLoginError);

    const onChangeUsername = useCallback(
        (username: string) => {
            dispatch(loginActions.setUsername(username));
        },
        [dispatch],
    );

    const onChangePassword = useCallback(
        (password: string) => {
            dispatch(loginActions.setPassword(password));
        },
        [dispatch],
    );

    const onLoginClick = useCallback(async () => {
        const loginRes = await dispatch(loginByUsername({ username, password }));

        if (loginRes.meta.requestStatus === 'fulfilled') {
            onSuccess?.();
            window.location.reload();
        }
    }, [dispatch, username, password, onSuccess]);

    return (
        <DynamicModuleLoader reducers={initialReucers}>
            <div className={classNames(cls.LoginForm, {}, [className])}>
                <Text align="center" className={cls.title} title={t('authorization')} />
                <div className={cls.inputs}>
                    <Input
                        className={cls.input}
                        placeholder={t('username')}
                        value={username}
                        autoFocus
                        fullWidth
                        onChange={onChangeUsername}
                    />
                    <Input
                        className={cls.input}
                        placeholder={t('password')}
                        type="password"
                        value={password}
                        fullWidth
                        onChange={onChangePassword}
                    />
                </div>
                <Button className={cls.btn} disabled={isLoading} onClick={onLoginClick}>
                    {t('login')}
                </Button>
                {error !== undefined && (
                    <Text
                        className={cls.errorMsg}
                        text={error === 0 ? t('WRONG_LOGIN_OR_PASSWORD') : t('UNKNOW_AUTH_ERROR')}
                        theme="error"
                    />
                )}
            </div>
        </DynamicModuleLoader>
    );
});

export default LoginForm;
