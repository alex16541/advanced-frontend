export interface SidebarItemType {
    Icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    path: string;
    text: string;
    authOnly?: boolean;
}
