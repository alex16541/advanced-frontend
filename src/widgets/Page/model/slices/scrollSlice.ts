import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScrollSchema } from '../types/ScrollSchema';

const initialState: ScrollSchema = {
    positions: {},
};

export const ScrollSlice = createSlice({
    name: 'scroll',
    initialState,
    reducers: {
        setScrollPosition(state, { payload }: PayloadAction<{ path: string; position: number }>) {
            state.positions[payload.path] = payload.position;
        },
    },
});
export const { actions: ScrollActions, reducer: ScrollReducer } = ScrollSlice;
