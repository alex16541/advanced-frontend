import 'app/styles/index.scss';
import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { loginReducer } from 'features/AuthByUsername/model/slices/loginSlice';
import { profileReducer } from 'entity/Profile';
import { articleDetailsReducer } from 'entity/Article/model/slices/articleDetailsSlice';
import { articleCommentsReducer } from 'features/ArticleCommentsList/model/slices/articleCommentsList';

const defaultReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
    loginForm: loginReducer,
    profile: profileReducer,
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
