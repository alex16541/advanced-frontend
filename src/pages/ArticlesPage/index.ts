export { ArticlesPageAsync as ArticlesPage } from './ui/ArticlesPage/ArticlesPage.async';
export {
    articlesPageActions,
    articlesPageReducer,
    articlesPageSelectors,
    articlesPageSlice,
} from './model/slices/articlesPageSlice';
export { fetchNextArticlesPage } from './model/services/fetchNextArticlesPage/fetchNextArticlesPage';
export type { ArticlesPageSchema } from './model/types/ArticlesPageSchema';
