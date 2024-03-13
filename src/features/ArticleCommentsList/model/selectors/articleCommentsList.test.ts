import { StateSchema } from '@/app/providers/StoreProvider';

import { ArticleCommentsErrors } from '../consts/articleCommentList';

import {
    getArticleCommentsListError,
    getArticleCommentsListIsLoading,
} from './articleCommentsList';

describe('getArticleCommentsListIsLoading', () => {
    test('should return is loading', () => {
        const data: DeepPartial<StateSchema> = {
            articleComments: {
                isLoading: false,
            },
        };

        expect(getArticleCommentsListIsLoading(data as StateSchema)).toBe(
            false,
        );
    });

    test('should with udnefined', () => {
        const data: DeepPartial<StateSchema> = {};

        expect(getArticleCommentsListIsLoading(data as StateSchema)).toBe(
            false,
        );
    });
});

describe('getArticleCommentsListError', () => {
    test('should return error', () => {
        const data: DeepPartial<StateSchema> = {
            articleComments: {
                error: [ArticleCommentsErrors.SERVER_ERROR],
            },
        };

        expect(getArticleCommentsListError(data as StateSchema)).toEqual([
            ArticleCommentsErrors.SERVER_ERROR,
        ]);
    });

    test('should with udnefined', () => {
        const data: DeepPartial<StateSchema> = {};

        expect(getArticleCommentsListError(data as StateSchema)).toEqual([]);
    });
});
