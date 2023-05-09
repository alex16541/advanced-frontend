import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Text, TextSize } from 'shared/ui/Text/Text';
import cls from './CommentCard.module.scss';
import { Comment } from '../../model/types/comment';

interface CommentCardProps {
    className?: string;
    comment: Comment;
    isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
    const { className, comment, isLoading } = props;

    return (
        <div className={classNames(cls.CommentCard, {}, [className])}>
            {comment.user.avatar && <Avatar src={comment.user.avatar} size={70} alt={comment.user.username} />}
            <div className="comment__body">
                <Text text={comment.user.username} size={TextSize.L} />
                <Text text={comment.text} />
            </div>
        </div>
    );
});
