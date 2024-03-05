import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { ArticleCommentsErrors } from '../../consts/articleCommentList';
import { fetchCommentsByArticleId } from './fetchCommentsByArticleId';

describe('fetchCommentsByArticleId', () => {
    test('add comment success', async () => {
        const returnValue = [
            {
                text: '(づ￣ 3￣)づ',
                userId: '1',
                articleId: '1',
                id: '1',
            },
            {
                text: 'o(一︿一+)o',
                userId: '2',
                articleId: '1',
                id: '2',
            },
        ];

        const thunk = new TestAsyncThunk(fetchCommentsByArticleId);
        thunk.api.get.mockResolvedValue({
            data: returnValue,
        });

        const actionResult = await thunk.callThunk('1');

        expect(thunk.api.get).toHaveBeenCalled();
        expect(actionResult.meta.requestStatus).toBe('fulfilled');
    });

    test('add comment error', async () => {
        const thunk = new TestAsyncThunk(fetchCommentsByArticleId);
        thunk.api.get.mockResolvedValue({
            status: 403,
        });

        const actionResult = await thunk.callThunk('some test');

        expect(actionResult.meta.requestStatus).toBe('rejected');
        expect(actionResult.payload).toEqual([
            ArticleCommentsErrors.SERVER_ERROR,
        ]);
    });
});
