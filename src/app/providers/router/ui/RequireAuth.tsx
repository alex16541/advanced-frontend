import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { getAuthData } from '@/entity/User';
import { getRouteMain } from '@/shared/consts/router';

export const RequireAuth = ({ children }: { children: ReactNode }) => {
    const isAuth = useSelector(getAuthData);
    const location = useLocation();

    if (!isAuth) {
        return <Navigate state={{ from: location }} to={getRouteMain()} replace />;
    }

    return <>{children}</>;
};
