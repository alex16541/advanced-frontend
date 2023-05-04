import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { ArticleErrors } from '../../types/article';
import { fetchArticleById } from './fetchArticleById';

describe('fetchProfileData', () => {
    const returnValue = {
        id: '1',
        title: 'title',
        subtitle: 'subtitle',
    };
    test('fetch success', async () => {
        const thunk = new TestAsyncThunk(fetchArticleById);
        thunk.api.get.mockResolvedValue({
            data: returnValue,
        });
        const actionResult = await thunk.callThunk('1');

        expect(actionResult.meta.requestStatus).toBe('fulfilled');
        expect(actionResult.payload).toEqual(returnValue);
    });

    test('fetch error', async () => {
        const thunk = new TestAsyncThunk(fetchArticleById);
        thunk.api.get.mockResolvedValue({
            status: 403,
        });

        const actionResult = await thunk.callThunk('1');

        expect(actionResult.meta.requestStatus).toBe('rejected');
        expect(actionResult.payload).toEqual([ArticleErrors.SERVER_ERROR]);
    });
});
