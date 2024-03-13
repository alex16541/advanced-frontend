import { createSelector } from 'reselect';

import { getAuthData } from '@/entity/User';
import ArticleIcon from '@/shared/assets/svg/article.svg';
import HomeIcon from '@/shared/assets/svg/home.svg';
import ListIcon from '@/shared/assets/svg/list.svg';
import ProfileIcon from '@/shared/assets/svg/profile.svg';
import { RoutePath } from '@/shared/const/router';

import { SidebarItemType } from '../../types/sidebarItem';

export const selectSidebarItems = createSelector(getAuthData, (authData) => {
    const sidebarItems: SidebarItemType[] = [
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
    ];

    if (authData) {
        sidebarItems.push(
            {
                Icon: ProfileIcon,
                path: RoutePath.profile + authData.id,
                text: 'your profile page title',
                authOnly: true,
            },
            {
                Icon: ArticleIcon,
                path: RoutePath.articles,
                text: 'articles',
                authOnly: true,
            },
        );
    }

    return sidebarItems;
});
