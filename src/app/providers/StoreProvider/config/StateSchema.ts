import {
    AnyAction, CombinedState, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { AxiosInstance } from 'axios';
import { ArticleDetailsSchema } from 'entity/Article';
import { CounterSchema } from 'entity/Counter';
import { UserSchema } from 'entity/User';
import { ArticleCommentsSchema } from 'features/ArticleCommentsList';
import { ArticleSearchSchema } from 'features/ArticleSearch';
import { ArticlesFiltersSchema } from 'features/ArticlesFilters';
import { LoginSchema } from 'features/AuthByUsername';
import { ArticlesPageSchema } from 'pages/ArticlesPage';
import { ScrollSchema } from 'widgets/Page';
import { rtkApi } from 'shared/api/rtkApi';
import { EditableProfileCardSchema } from 'features/EditableProfileCard';

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
    scroll: ScrollSchema;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

    // Async
    loginForm?: LoginSchema;
    editableProfileCard?: EditableProfileCardSchema;

    // Article
    articleDetails?: ArticleDetailsSchema;
    articleComments?: ArticleCommentsSchema;
    articlesPage?: ArticlesPageSchema;
    articleSearch?: ArticleSearchSchema;
    articlesFilters?: ArticlesFiltersSchema;
}

export type StateSchemaKey = keyof StateSchema;
export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, actions: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends ToolkitStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
