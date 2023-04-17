import ListIcon from 'shared/assets/svg/list.svg';
import HomeIcon from 'shared/assets/svg/home.svg';
import ProfileIcon from 'shared/assets/svg/profile.svg';
import ArticleIcon from 'shared/assets/svg/article.svg';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

export interface SidebarItemType {
    Icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    path: string;
    text: string;
    authOnly?: boolean;
}

export const sidebarItems: SidebarItemType[] = [
    {
        Icon: HomeIcon,
        path: RoutePath.main,
        text: 'main page title',
    },
    {
        Icon: ListIcon,
        path: RoutePath.about,
        text: 'about page title',
    },
    {
        Icon: ProfileIcon,
        path: RoutePath.profile,
        text: 'your profile page title',
        authOnly: true,
    },
    {
        Icon: ArticleIcon,
        path: RoutePath.articles,
        text: 'articles',
        authOnly: true,
    },
];
