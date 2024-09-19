import { memo } from 'react';

import { getRouteProfile } from '@/shared/consts/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { Comment } from '../../model/types/comment';

import cls from './CommentCard.module.scss';

interface CommentCardProps {
    className?: string;
    comment: Comment;
}

export const CommentCard = memo((props: CommentCardProps) => {
    const { className, comment } = props;

    return (
        
                        <Card className={classNames(cls.CommentCard, {}, [className])} data-testid="CommentCard">
                            <VStack gap="12">
                                <AppLink to={getRouteProfile(comment.user.id)}>
                                    <HStack gap="8">
                                        {comment.user.avatar && (
                                            <Avatar alt={comment.user.username} size={32} src={comment.user.avatar} />
                                        )}
                                        <Text size="l" text={comment.user.username} weight="bold" />
                                    </HStack>
                                </AppLink>

                                <Text text={comment.text} />
                            </VStack>
                        </Card>
                    
    );
});
