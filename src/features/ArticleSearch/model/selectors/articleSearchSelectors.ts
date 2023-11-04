import { StateSchema } from 'app/providers/StoreProvider';

export const selectArticleSearchValue = (state: StateSchema) => state.articleSearch?.value;
