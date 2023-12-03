import {
    AnyAction, CombinedState, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { AxiosInstance } from 'axios';
import { ArticleDetailsSchema } from 'entity/Article';
import { CounterSchema } from 'entity/Counter';
import { ProfileSchema } from 'entity/Profile';
import { UserSchema } from 'entity/User';
import { ArticleCommentsSchema } from 'features/ArticleCommentsList';
import { ArticleSearchSchema } from 'features/ArticleSearch/model/types/articleSearchSchema';
import { ArticlesFiltersSchema } from 'features/ArticlesFilters/model/types/ArticlesFiltersSchema';
import { LoginSchema } from 'features/AuthByUsername';
import { ArticleDetailsRecommendationsSchema } from 'pages/ArticleDetailsPage';
import { ArticlesPageSchema } from 'pages/ArticlesPage';
import { ScrollSchema } from 'widgets/Page';

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
    scroll: ScrollSchema;

    // Async
    loginForm?: LoginSchema;
    profile?: ProfileSchema;

    // Article
    articleDetails?: ArticleDetailsSchema;
    articleComments?: ArticleCommentsSchema;
    articleRecommendations?: ArticleDetailsRecommendationsSchema;
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
