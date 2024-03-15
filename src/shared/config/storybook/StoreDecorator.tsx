import { Story } from '@storybook/react';

import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { articleDetailsReducer } from '@/entity/Article/testing';
import { articleCommentsReducer } from '@/features/ArticleCommentsList/testing';
import { loginReducer } from '@/features/AuthByUsername/testing';
import { editableProfileCardReducer } from '@/features/EditableProfileCard/testing';
import { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

const defaultReducers: ReducersList = {
    loginForm: loginReducer,
    editableProfileCard: editableProfileCardReducer,
    articleDetails: articleDetailsReducer,
    articleComments: articleCommentsReducer,
};
export const StoreDecorator = (
    state: DeepPartial<StateSchema>,
    asyncReducers?: ReducersList,
) => {
    const ComponentWithStoreDecorator = (StoryComponent: Story) => (
        <StoreProvider asyncReducers={{ ...defaultReducers, ...asyncReducers }} initialState={state}>
            <StoryComponent />
        </StoreProvider>
    );

    return ComponentWithStoreDecorator;
};
