export interface ArticleRating {
    articleId: string | number;
    userId: string | number;
    rating: string | number;
    feedback?: string;
}
