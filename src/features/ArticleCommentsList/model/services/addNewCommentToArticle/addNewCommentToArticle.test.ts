import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { StateSchema } from '@/app/providers/StoreProvider';
import { addNewCommentToArticle } from './addNewCommentToArticle';
import { ArticleCommentsErrors } from '../../consts/articleCommentList';

describe('addNewCommentToArticle', () => {
    const state: DeepPartial<StateSchema> = {
        user: {
            authData: {
                id: '1',
            },
        },
        articleDetails: {
            data: {
                id: '1',
            },
        },
    };

    test('add comment success', async () => {
        const returnValue = {};

        const thunk = new TestAsyncThunk(addNewCommentToArticle, state);
        thunk.api.post.mockResolvedValue({
            data: returnValue,
        });

        const actionResult = await thunk.callThunk('some comment');

        expect(thunk.api.post).toHaveBeenCalled();
        expect(actionResult.meta.requestStatus).toBe('fulfilled');
    });

    test('add comment with invalid data', async () => {
        const thunk = new TestAsyncThunk(addNewCommentToArticle, {
            ...state,
            user: { authData: { id: undefined } },
        });
        thunk.api.post.mockResolvedValue({
            status: 403,
        });

        const actionResult = await thunk.callThunk('some test');

        expect(actionResult.meta.requestStatus).toBe('rejected');
        expect(actionResult.payload).toEqual([
            ArticleCommentsErrors.INVALID_DATA,
        ]);
    });

    test('add comment error', async () => {
        const thunk = new TestAsyncThunk(addNewCommentToArticle, state);
        thunk.api.post.mockResolvedValue({
            status: 403,
        });

        const actionResult = await thunk.callThunk('some test');

        expect(actionResult.meta.requestStatus).toBe('rejected');
        expect(actionResult.payload).toEqual([
            ArticleCommentsErrors.SERVER_ERROR,
        ]);
    });
});
