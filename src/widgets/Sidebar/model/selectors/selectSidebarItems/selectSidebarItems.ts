import { createSelector } from 'reselect';

import { getAuthData } from '@/entity/User';
import ArticleIcon from '@/shared/assets/svg/article.svg';
import HomeIcon from '@/shared/assets/svg/home.svg';
import InfoIcon from '@/shared/assets/svg/info.svg';
import ProfileIcon from '@/shared/assets/svg/profile.svg';
import { getRouteAbout, getRouteArticles, getRouteMain, getRouteProfile } from '@/shared/consts/router';

import { SidebarItemType } from '../../types/sidebarItem';

export const selectSidebarItems = createSelector(getAuthData, (authData) => {
    const sidebarItems: SidebarItemType[] = [
        {
            Icon: HomeIcon,
            path: getRouteMain(),
            text: 'main page title',
        },
        {
            Icon: InfoIcon,
            path: getRouteAbout(),
            text: 'about page title',
        },
    ];

    if (authData) {
        sidebarItems.push(
            {
                Icon: ProfileIcon,
                path: getRouteProfile(authData.id),
                text: 'your profile page title',
                authOnly: true,
            },
            {
                Icon: ArticleIcon,
                path: getRouteArticles(),
                text: 'articles',
                authOnly: true,
            },
        );
    }

    return sidebarItems;
});
