import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

import { fetchNextArticlesPage } from './fetchNextArticlesPage';

jest.mock('../fetchArticlesList/fetchArticlesList.ts');

describe('fetchNextArticlesPage', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
            articlesPage: {
                entities: {},
                ids: [],
                page: 2,
                limit: 3,
                isLoading: false,
                hasMore: true,
            },
        });

        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(3);
        expect(fetchArticlesList).toHaveBeenCalledWith({
            page: 3,
            limit: 3,
            order: 'asc',
            sort: 'title',
            type: 'all',
            query: '',
            replace: false,
        });
    });

    test('fetchArticlesList not called', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
            articlesPage: {
                entities: {},
                ids: [],
                page: 2,
                limit: 3,
                isLoading: false,
                hasMore: false,
            },
        });

        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(2);
        expect(fetchArticlesList).not.toHaveBeenCalled();
    });

    test('fetchArticlesList not called while loading', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
            articlesPage: {
                entities: {},
                ids: [],
                page: 2,
                limit: 3,
                isLoading: true,
                hasMore: true,
            },
        });

        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(2);
        expect(fetchArticlesList).not.toHaveBeenCalled();
    });
});
