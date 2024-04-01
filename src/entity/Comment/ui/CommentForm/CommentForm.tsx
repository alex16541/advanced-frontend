import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getAuthData } from '@/entity/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Button } from '@/shared/ui/deprecated/Button';
import { Input } from '@/shared/ui/deprecated/Input';

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
        <form
            className={classNames(cls.CommentForm, {}, [className, cls.commentForm])}
            data-testid="CommentForm"
        >
            {authData?.avatar && <Avatar alt={authData.username} src={authData?.avatar} />}
            <div className={cls.commentForm__body}>
                <Input
                    className={cls.commentForm__input}
                    data-testid="CommentForm.Input"
                    placeholder={t('Your comment')}
                    readonly={isLoading}
                    value={comment}
                    fullWidth
                    onChange={onChangeComment}
                />
                <Button
                    className={cls.commentForm__button}
                    data-testid="CommentForm.Submit"
                    isLoading={isLoading}
                    onClick={onSubmit}
                >
                    {t('leave a comment')}
                </Button>
            </div>
        </form>
    );
});
