import { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoutesProps, routeConfig } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { PageLoader } from 'widgets/PageLoader';
import cls from './AppRouter.module.scss';
import { RequireAuth } from './RequireAuth';

interface AppRouterProps {
    className?: string;
}

export const AppRouter = (props: AppRouterProps) => {
    const { className } = props;

    const renderWithWrapper = useCallback(({ authOnly, path, element }: AppRoutesProps) => {
        const routeElement = authOnly ? (
            <RequireAuth>{element}</RequireAuth>
        ) : element;

        const route = (
            <Route
                key={path}
                element={routeElement}
                path={path}
            />
        );

        return route;
    }, []);

    return (
        <div className={classNames(cls.AppRouter, {}, [className])}>
            <Suspense fallback={<PageLoader />}>
                <Routes>
                    {Object.values(routeConfig).map(renderWithWrapper)}
                </Routes>
            </Suspense>
        </div>
    );
};

export default memo(AppRouter);
