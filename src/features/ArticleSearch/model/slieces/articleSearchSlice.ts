import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleSearchSchema } from '../types/articleSearchSchema';

const initialState: ArticleSearchSchema = {
    value: '',
};

export const articleSearchSlice = createSlice({
    name: 'articleSearch',
    initialState,
    reducers: {
        setValue: (state, { payload }: PayloadAction<string>) => {
            state.value = payload;
        },
    },
});
export const { actions: articleSearchActions, reducer: articleSearchReducer } = articleSearchSlice;
