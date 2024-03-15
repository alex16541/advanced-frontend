import { memo } from 'react';

import { getRouteProfile } from '@/shared/consts/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink';
import { Avatar } from '@/shared/ui/Avatar';
import { Text, TextSize } from '@/shared/ui/Text';

import { Comment } from '../../model/types/comment';

import cls from './CommentCard.module.scss';

interface CommentCardProps {
    className?: string;
    comment: Comment;
}

export const CommentCard = memo((props: CommentCardProps) => {
    const { className, comment } = props;

    return (
        <div className={classNames(cls.CommentCard, {}, [className])}>
            {comment.user.avatar && (
                <AppLink to={getRouteProfile(comment.user.id)}>
                    <Avatar alt={comment.user.username} src={comment.user.avatar} />
                </AppLink>
            )}
            <div className="comment__body">
                <AppLink to={getRouteProfile(comment.user.id)}>
                    <Text size={TextSize.L} text={comment.user.username} />
                </AppLink>
                <Text text={comment.text} />
            </div>
        </div>
    );
});
