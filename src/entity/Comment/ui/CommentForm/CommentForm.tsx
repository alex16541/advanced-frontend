import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Input } from 'shared/ui/Input';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import cls from './CommentForm.module.scss';

interface CommentFormProps {
    className?: string;
    avatarSrc?: string;
}

export const CommentForm = memo((props: CommentFormProps) => {
    const { className, avatarSrc } = props;
    const { t } = useTranslation('comment-form');

    return (
        <div className={classNames(cls.CommentForm, {}, [className, cls.comment])}>
            {avatarSrc && <Avatar src={avatarSrc} alt={t('avatar')} />}
            <div className={cls.comment__body}>
                <Input className={cls.comment__input} placeholder={t('Your comment')} />
                <Button className={cls.comment__button}>{t('leave a comment')}</Button>
            </div>
        </div>
    );
});
