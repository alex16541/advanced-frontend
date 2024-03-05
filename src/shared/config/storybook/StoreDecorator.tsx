import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { loginReducer } from '@/features/AuthByUsername/model/slices/loginSlice';

import { articleDetailsReducer } from '@/entity/Article/model/slices/articleDetailsSlice';
import { articleCommentsReducer } from '@/features/ArticleCommentsList/model/slices/articleCommentsListSlice';
import { editableProfileCardReducer } from '@/features/EditableProfileCard';

const defaultReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
    loginForm: loginReducer,
    editableProfileCard: editableProfileCardReducer,
    articleDetails: articleDetailsReducer,
    articleComments: articleCommentsReducer,
};
export const StoreDecorator = (
    state: DeepPartial<StateSchema>,
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>,
) => {
    const ComponentWithStoreDecorator = (StoryComponent: Story) => (
        <StoreProvider initialState={state} asyncReducers={{ ...defaultReducers, ...asyncReducers }}>
            <StoryComponent />
        </StoreProvider>
    );

    return ComponentWithStoreDecorator;
};
