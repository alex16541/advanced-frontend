import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/deprecated/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';

import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';

import cls from './CommentList.module.scss';

interface CommentListProps {
    className?: string;
    comments?: Comment[];
}

export const CommentList = memo((props: CommentListProps) => {
    const { className, comments } = props;
    const { t } = useTranslation();

    const commentCards = useMemo(
        () =>
            comments?.map((comment: Comment) => (
                <CommentCard className={cls.commentCard} comment={comment} key={comment.id} />
            )),
        [comments],
    );

    return (
        <VStack className={classNames(cls.CommentList, {}, [className])} gap="16">
            {comments ? commentCards : <Text text={t('No comments')} />}
        </VStack>
    );
});
