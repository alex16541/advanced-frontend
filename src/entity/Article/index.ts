export { ArticleDetails } from './ui/ArticleDetails/ArticleDetails';
export { ArticlesList, ArticlesListCountPeerView } from './ui/ArticlesList/ArticlesList';
export { getArticleDetailsData } from './model/selectors/articleDetails';
export { article } from './mock/data';

export type { Article } from './model/types/article';
export type { ArticleDetailsSchema } from './model/types/articleDetailsSchema';

export {
    ArticleBlockType,
    ArticleErrors,
    ArticleSortField,
    ArticleType,
    ArticlesListView,
} from './model/consts/article';
