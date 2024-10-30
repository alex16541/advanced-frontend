export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    ARTICLE_DETAILS = 'article-details',
    ARTICLE_CREATE = 'article-create',
    ARTICLE_EDIT = 'article-edit',
    ARTICLE_PUBLISH = 'article-publish',
    ARTICLES = 'articles',
    ADMIN = 'admin',
    SETTINGS = 'settings',

    // Last
    FROBIDDEN = 'forbidden',
    NOT_FOUND = 'notFound',
}

export const getRouteMain = () => '/';
export const getRouteAbout = () => '/about';
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteArticleDetails = (id: string) => `/articles/${id}`;
export const getRouteArticleCreate = () => '/create-new-article';
export const getRouteArticleEdit = (id: string) => `/articles/${id}/edit`;
export const getRouteArticlePublish = (id: string) => `/articles/${id}/publish`;
export const getRouteArticles = () => '/articles';
export const getRouteAdmin = () => '/admin';
export const getRouteForbidden = () => '/forbidden';
export const getRouteSettings = () => '/settings';

export const AppRouteByPathPattern: Record<string, AppRoutes> = {
    [getRouteMain()]: AppRoutes.MAIN,
    [getRouteAbout()]: AppRoutes.ABOUT,
    [getRouteProfile(':id')]: AppRoutes.PROFILE,
    [getRouteArticleDetails(':id')]: AppRoutes.ARTICLE_DETAILS,
    [getRouteArticleCreate()]: AppRoutes.ARTICLE_EDIT,
    [getRouteArticleEdit(':id')]: AppRoutes.ARTICLE_CREATE,
    [getRouteArticlePublish(':id')]: AppRoutes.ARTICLE_PUBLISH,
    [getRouteArticles()]: AppRoutes.ARTICLES,
    [getRouteAdmin()]: AppRoutes.ADMIN,
    [getRouteForbidden()]: AppRoutes.SETTINGS,
    [getRouteSettings()]: AppRoutes.FROBIDDEN,
};
