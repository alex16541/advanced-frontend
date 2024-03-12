import { Story } from '@storybook/react';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { loginReducer } from '@/features/AuthByUsername/testing';
import { articleDetailsReducer } from '@/entity/Article/testing';
import { articleCommentsReducer } from '@/features/ArticleCommentsList/testing';
import { editableProfileCardReducer } from '@/features/EditableProfileCard/testing';

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
