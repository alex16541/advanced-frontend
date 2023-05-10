export enum newArticleCommentError {
    SERVER_ERROR = 'server error',
}

export interface newArticleCommentSchema {
    text?: string;
    isLoading?: boolean;
    error?: newArticleCommentError[];
}
