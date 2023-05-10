import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { getAuthData } from 'entity/User';
import cls from './AddNewArticleComment.module.scss';
import { CommentForm } from '../../../entity/Comment/ui/CommentForm/CommentForm';

interface AddNewArticleCommentProps {
    className?: string;
}

export const AddNewArticleComment = memo((props: AddNewArticleCommentProps) => {
    const { className } = props;
    const authData = useSelector(getAuthData);

    return (
        <div className={classNames(cls.AddNewArticleComment, {}, [className])}>
            <CommentForm avatarSrc={authData?.avatar} />
        </div>
    );
});
