import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { routeConfig } from "shared/config/routeConfig/routeConfig";
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AppRouter.module.scss';

interface AppRouterProps {
    className?: string
}

export const AppRouter = (props: AppRouterProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.AppRouter, {}, [className])}>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    {Object.values(routeConfig).map(({ element, path }) => (
                        <Route key={path} element={element} path={path} />
                    ))}
                </Routes>
            </Suspense>
        </div>
    );
}

export default AppRouter;