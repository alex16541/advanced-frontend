import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getAuthData } from '@/entity/User';
import SendIcon from '@/shared/assets/svg/send.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { FeatureToggle } from '@/shared/lib/features/components/FeatureToggle/FeatureToggle';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Button } from '@/shared/ui/redesigned/Button';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Input } from '@/shared/ui/redesigned/Input';

import cls from './CommentForm.module.scss';

interface CommentFormProps {
    className?: string;
    onSubmit?: () => void;
    comment: string;
    onChangeComment: (text: string) => void;
    isLoading?: boolean;
}

export const CommentForm = memo((props: CommentFormProps) => {
    const { className, onSubmit, comment, onChangeComment, isLoading } = props;
    const { t } = useTranslation('comment-form');

    const authData = useSelector(getAuthData);

    return (
        <FeatureToggle
            feature="isRedesignedApp"
            off={
                <form
                    className={classNames(cls.CommentFormDeprecated, {}, [className])}
                    data-testid="CommentForm"
                >
                    {authData?.avatar && <AvatarDeprecated alt={authData.username} src={authData?.avatar} />}
                    <div className={cls.body}>
                        <InputDeprecated
                            className={cls.input}
                            data-testid="CommentForm.Input"
                            placeholder={t('Your comment')}
                            readonly={isLoading}
                            value={comment}
                            fullWidth
                            onChange={onChangeComment}
                        />
                        <ButtonDeprecated
                            className={cls.button}
                            data-testid="CommentForm.Submit"
                            isLoading={isLoading}
                            onClick={onSubmit}
                        >
                            {t('leave a comment')}
                        </ButtonDeprecated>
                    </div>
                </form>
            }
            on={
                <form className={classNames(cls.CommentForm, {}, [className])} data-testid="CommentForm">
                    {authData?.avatar && <Avatar alt={authData.username} size={36} src={authData?.avatar} />}
                    <Input
                        className={cls.input}
                        data-testid="CommentForm.Input"
                        placeholder={t('Your comment')}
                        readonly={isLoading}
                        value={comment}
                        fullWidth
                        onChange={onChangeComment}
                    />
                    <Button
                        className={cls.button}
                        data-testid="CommentForm.Submit"
                        isLoading={isLoading}
                        onClick={onSubmit}
                    >
                        <Icon Svg={SendIcon} />
                    </Button>
                </form>
            }
        />
    );
});
