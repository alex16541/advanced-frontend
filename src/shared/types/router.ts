import { RouteProps } from 'react-router-dom';
import { UserRoles } from '@/entity/User';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    roles?: UserRoles[];
};

export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    ARTICLE_DETAILS = 'article-details',
    ARTICLE_CREATE = 'article-create',
    ARTICLE_EDIT = 'article-edit',
    ARTICLES = 'articles',
    ADMIN = 'admin',

    // Last
    FROBIDDEN = 'forbidden',
    NOT_FOUND = 'notFound'
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.PROFILE]: '/profile/', // :id
    [AppRoutes.ARTICLE_DETAILS]: '/articles/', // :id
    [AppRoutes.ARTICLE_CREATE]: '/articles/new',
    [AppRoutes.ARTICLE_EDIT]: '/articles/:id/edit',
    [AppRoutes.ARTICLES]: '/articles',
    [AppRoutes.ADMIN]: '/admin',

    // Last
    [AppRoutes.FROBIDDEN]: '/forbidden',
    [AppRoutes.NOT_FOUND]: '*',
};
