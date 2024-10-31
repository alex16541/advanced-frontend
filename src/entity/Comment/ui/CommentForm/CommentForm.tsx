import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getAuthData } from '@/entity/User';
import SendIcon from '@/shared/assets/svg/send.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Button } from '@/shared/ui/redesigned/Button';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Input } from '@/shared/ui/redesigned/Input';

import cls from './CommentForm.module.scss';
import '../../i18n/i18n';

interface CommentFormProps {
    className?: string;
    onSubmit?: () => void;
    comment?: string;
    onChangeComment: (text: string) => void;
    isLoading?: boolean;
}

export const CommentForm = memo((props: CommentFormProps) => {
    const { className, onSubmit, comment = '', onChangeComment, isLoading } = props;
    const { t } = useTranslation('CommentForm');

    const authData = useSelector(getAuthData);

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit?.();
    };

    return (
        <form
            className={classNames(cls.CommentForm, {}, [className])}
            data-testid="CommentForm"
            onSubmit={onSubmitHandler}
        >
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
                disabled={!comment.trim()}
                isLoading={isLoading}
                type="submit"
            >
                <Icon Svg={SendIcon} />
            </Button>
        </form>
    );
});
