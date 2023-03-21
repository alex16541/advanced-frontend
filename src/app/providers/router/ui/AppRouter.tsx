import { memo, Suspense, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { PageLoader } from 'widgets/PageLoader';
import { useSelector } from 'react-redux';
import { getAuthData } from 'entity/User';
import cls from './AppRouter.module.scss';

interface AppRouterProps {
    className?: string;
}

export const AppRouter = (props: AppRouterProps) => {
    const { className } = props;

    const isAuth = useSelector(getAuthData);

    const routes = useMemo(() => Object
        .values(routeConfig)
        .filter((route) => {
            if (route.authOnly) {
                return isAuth;
            }
            return true;
        }), [isAuth]);

    return (
        <div className={classNames(cls.AppRouter, {}, [className])}>
            <Suspense fallback={<PageLoader />}>
                <Routes>
                    {routes.map(({ element, path }) => (
                        <Route
                            key={path}
                            element={element}
                            path={path}
                        />
                    ))}
                </Routes>
            </Suspense>
        </div>
    );
};

export default memo(AppRouter);
