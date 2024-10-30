import { i18nSidebarKeys } from '../../i18n/i18n';

export interface SidebarItemType {
    Icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    path: string;
    text: i18nSidebarKeys;
    authOnly?: boolean;
}
