import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import { CommentForm } from 'entity/Comment/ui/CommentForm/CommentForm';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { addNewCommentToArticle } from '../../model/services/addNewCommentToArticle/addNewCommentToArticle';
import cls from './NewArticleCommentForm.module.scss';

interface NewArticleCommentFormProps {
    className?: string;
    onCommentAdded?: () => void;
}

export const NewArticleCommentForm = memo((props: NewArticleCommentFormProps) => {
    const { className, onCommentAdded } = props;
    const [comment, setComment] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();

    const onNewCommentFormSubmit = useCallback(() => {
        setIsLoading(true);
        const addNewComment = dispatch(addNewCommentToArticle(comment));

        addNewComment.then(() => {
            setComment('');
            setIsLoading(false);
            onCommentAdded?.();
        });
    }, [comment, dispatch, onCommentAdded]);

    return (
        <div className={classNames(cls.NewArticleCommentForm, {}, [className])}>
            <CommentForm
                onSubmit={onNewCommentFormSubmit}
                comment={comment}
                onChangeComment={setComment}
                isLoading={isLoading}
            />
        </div>
    );
});
