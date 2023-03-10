import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';
import { AboutPage } from 'pages/AboutPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ProfilePage } from 'pages/ProfilePage';
import { SidebarItemType } from 'widgets/Sidebar';
import ListIcon from 'shared/assets/svg/list.svg';
import HomeIcon from 'shared/assets/svg/home.svg';
import ProfileIcon from 'shared/assets/svg/profile.svg';

export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',

    // Last
    NOT_FOUND = 'notFound',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.PROFILE]: '/profile',

    // Last
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [AppRoutes.ABOUT]: {
        path: RoutePath.about,
        element: <AboutPage />,
    },
    [AppRoutes.PROFILE]: {
        path: RoutePath.profile,
        element: <ProfilePage />,
    },

    // Last
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.notFound,
        element: <NotFoundPage />,
    },
};

export const sidebarItems: SidebarItemType[] = [
    {
        Icon: HomeIcon,
        path: RoutePath.main,
        title: 'main-page-title',
    },
    {
        Icon: ListIcon,
        path: RoutePath.about,
        title: 'about-page-title',
    },
    {
        Icon: ProfileIcon,
        path: RoutePath.profile,
        title: 'your-profile-page-title',
    },
];
