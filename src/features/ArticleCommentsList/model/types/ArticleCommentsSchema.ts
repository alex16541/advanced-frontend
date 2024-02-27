import { Comment } from 'entity/Comment';
import { EntityState } from '@reduxjs/toolkit';
import { ArticleCommentsErrors } from '../consts/articleCommentList';

export interface ArticleCommentsSchema extends EntityState<Comment> {
    isLoading?: boolean;
    error?: ArticleCommentsErrors[];
}
