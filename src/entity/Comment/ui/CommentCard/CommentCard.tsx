import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { AppRoutes } from '@/shared/types/router';
import cls from './CommentCard.module.scss';
import { Comment } from '../../model/types/comment';

interface CommentCardProps {
    className?: string;
    comment: Comment;
}

export const CommentCard = memo((props: CommentCardProps) => {
    const { className, comment } = props;

    return (
        <div className={classNames(cls.CommentCard, {}, [className])}>
            {comment.user.avatar && (
                <AppLink to={`/${AppRoutes.PROFILE}/${comment.user.id}`}>
                    <Avatar src={comment.user.avatar} alt={comment.user.username} />
                </AppLink>
            )}
            <div className="comment__body">
                <AppLink to={`/${AppRoutes.PROFILE}/${comment.user.id}`}>
                    <Text text={comment.user.username} size={TextSize.L} />
                </AppLink>
                <Text text={comment.text} />
            </div>
        </div>
    );
});
