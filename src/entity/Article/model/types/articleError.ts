import { AppError } from '@/shared/types/AppError';
import { AppErrorType } from '@/shared/types/errors';

type BaseArticleErrorType = 'ARTICLE_CREATE_ERROR';

export type ArticleErrorType = BaseArticleErrorType | AppErrorType;

export class ArticleError extends AppError {
    message: string;

    errorCode: ArticleErrorType;

    constructor(status: number) {
        const code = AppError.getCode(status);
        const message = ArticleError.getMessage(code);
        super(status, message);
        this.name = 'ArticleError';
        this.errorCode = code;
        this.message = message;
    }

    static getMessage(code: ArticleErrorType): string {
        const messages: OptionalRecord<ArticleErrorType, string> = {
            ARTICLE_CREATE_ERROR: 'Ошибка создания статьи',
        };

        return messages[code] || super.getMessage(code) || 'Неизвестная ошибка статьи';
    }
}
