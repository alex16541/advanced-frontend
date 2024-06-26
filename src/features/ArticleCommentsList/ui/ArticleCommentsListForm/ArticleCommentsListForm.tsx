import { memo, useCallback, useState } from 'react';

import { CommentForm } from '@/entity/Comment';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { classNames } from '@/shared/lib/classNames/classNames';

import { addNewCommentToArticle } from '../../model/services/addNewCommentToArticle/addNewCommentToArticle';

import cls from './ArticleCommentsListForm.module.scss';

interface ArticleCommentsListFormProps {
    className?: string;
    onCommentAdded?: () => void;
}

export const ArticleCommentsListForm = memo((props: ArticleCommentsListFormProps) => {
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
        <div className={classNames(cls.ArticleCommentsListForm, {}, [className])}>
            <CommentForm
                comment={comment}
                isLoading={isLoading}
                onChangeComment={setComment}
                onSubmit={onNewCommentFormSubmit}
            />
        </div>
    );
});
