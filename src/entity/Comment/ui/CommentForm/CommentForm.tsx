import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Input } from 'shared/ui/Input';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button';
import { useSelector } from 'react-redux';
import { getAuthData } from 'entity/User';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import cls from './CommentForm.module.scss';

interface CommentFormProps {
    className?: string;
    onSubmit?: () => void;
    comment: string;
    onChangeComment: (text: string) => void;
    isLoading?: boolean;
}

export const CommentForm = memo((props: CommentFormProps) => {
    const {
        className, onSubmit, comment, onChangeComment, isLoading,
    } = props;
    const { t } = useTranslation('comment-form');

    const authData = useSelector(getAuthData);

    return (
        <form className={classNames(cls.CommentForm, {}, [className, cls.commentForm])}>
            {authData?.avatar && <Avatar src={authData?.avatar} alt={authData.username} />}
            <div className={cls.commentForm__body}>
                <Input
                    className={cls.commentForm__input}
                    placeholder={t('Your comment')}
                    value={comment}
                    onChange={onChangeComment}
                    readonly={isLoading}
                />
                <Button className={cls.commentForm__button} onClick={onSubmit} isLoading={isLoading}>
                    {t('leave a comment')}
                </Button>
            </div>
        </form>
    );
});
