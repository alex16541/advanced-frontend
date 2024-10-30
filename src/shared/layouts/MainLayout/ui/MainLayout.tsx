import { ReactElement } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './MainLayout.module.scss';

interface MainLayoutProps {
    className?: string;
    content: ReactElement;
    sidebar: ReactElement;
    navbar: ReactElement;
    toolbar?: ReactElement;
}

export const MainLayout = (props: MainLayoutProps) => {
    const { className, content, navbar, sidebar, toolbar } = props;

    return (
        <div className={classNames(cls.MainLayout, {}, [className])}>
            <div className={cls.sidebar}>{sidebar}</div>
            <div className={cls.content}>{content}</div>
            <div className={cls.rightbar}>
                <div className={cls.navbar}>{navbar}</div>
                <div className={cls.toolbar}>{toolbar}</div>
            </div>
        </div>
    );
};
