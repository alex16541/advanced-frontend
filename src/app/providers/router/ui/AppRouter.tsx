import { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';

import { classNames } from '@/shared/lib/classNames/classNames';
import { PageLoader } from '@/widgets/PageLoader';

import { routeConfig } from '../config/routeConfig';
import { AppRoutesProps } from '../types';

import cls from './AppRouter.module.scss';
import { RequireAuth } from './RequireAuth';
import { RequireRoles } from './RequireRoles';

interface AppRouterProps {
    className?: string;
}

export const AppRouter = (props: AppRouterProps) => {
    const { className } = props;

    const renderWithWrapper = useCallback(({ authOnly, path, element, roles }: AppRoutesProps) => {
        const routeElement = authOnly ? (
            <RequireAuth>
                <RequireRoles roles={roles}>{element}</RequireRoles>
            </RequireAuth>
        ) : (
            element
        );

        const route = <Route element={routeElement} key={path} path={path} />;

        return route;
    }, []);

    return (
        <div className={classNames(cls.AppRouter, {}, [className])}>
            <Suspense fallback={<PageLoader />}>
                <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>
            </Suspense>
        </div>
    );
};

export default memo(AppRouter);
