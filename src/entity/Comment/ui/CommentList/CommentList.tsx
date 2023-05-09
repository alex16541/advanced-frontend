import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/Text/Text';
import cls from './CommentList.module.scss';
import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';

interface CommentListProps {
    className?: string;
    comments?: Comment[];
    isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
    const { className, comments, isLoading } = props;
    const { t } = useTranslation();

    const commentCards = useMemo(
        () => comments?.map((comment: Comment) => <CommentCard className={cls.commentCard} comment={comment} />),
        [comments],
    );

    if (isLoading) {
        return <Text text="test loading..." />;
    }

    return (
        <div className={classNames(cls.CommentList, {}, [className])}>
            {comments ? commentCards : <Text text={t('No comments')} />}
        </div>
    );
});
