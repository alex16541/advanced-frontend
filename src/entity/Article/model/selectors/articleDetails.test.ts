import { StateSchema } from '@/app/providers/StoreProvider';

import { ArticleDetailsSchema } from '../types/articleDetailsSchema';

import { getArticleDetailsData, getArticleDetailsErrors, getArticleDetailsIsLoading } from './articleDetails';

describe('getArticleDetailsData', () => {
    const data: DeepPartial<ArticleDetailsSchema> = {
        data: {
            id: '1',
            title: 'title',
            description: 'description',
        },
    };

    test('should return article data', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: data,
        };
        expect(getArticleDetailsData(state as StateSchema)).toEqual(data.data);
    });

    test('should work with undefined', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticleDetailsData(state as StateSchema)).toBe(null);
    });
});

describe('getArticleDetailsIsLoading', () => {
    const data: DeepPartial<ArticleDetailsSchema> = {
        isLoading: true,
    };

    test('should return article is loading', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: data,
        };
        expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(data.isLoading);
    });

    test('should work with undefined', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticleDetailsIsLoading(state as StateSchema)).toBe(false);
    });
});

describe('getArticleDetailsError', () => {
    const data: DeepPartial<ArticleDetailsSchema> = {
        error: ['SERVER_ERROR'],
    };

    test('should return article errors', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: data,
        };
        expect(getArticleDetailsErrors(state as StateSchema)).toEqual(data.error);
    });

    test('should work with undefined', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticleDetailsErrors(state as StateSchema)).toEqual([]);
    });
});
