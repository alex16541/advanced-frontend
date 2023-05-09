import { Comment } from 'entity/Comment';
import { EntityState } from '@reduxjs/toolkit';
import { ArticleCommentsErrors } from './articleCommentList';

export interface ArticleCommentsSchema extends EntityState<Comment> {
    isLoading?: boolean;
    error?: ArticleCommentsErrors[];
}
