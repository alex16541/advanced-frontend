import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getAuthData } from '@/entity/User';
import { RoutePath } from '@/shared/const/router';

export const RequireAuth = ({ children }: { children: ReactNode }) => {
    const isAuth = useSelector(getAuthData);
    const location = useLocation();

    if (!isAuth) {
        return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
    }

    return (
        <>
            {children}
        </>
    );
};
