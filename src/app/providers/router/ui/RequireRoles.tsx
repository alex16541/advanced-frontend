import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { UserRoles, getUserRoles } from '@/entity/User';
import { getRouteForbidden } from '@/shared/consts/router';
import { useAppSelector } from '@/shared/hooks/useAppSelector';

interface RequireRolesProps {
    children: ReactNode;
    roles?: UserRoles[];
}

export const RequireRoles = ({ children, roles }: RequireRolesProps) => {
    const userRoles = useAppSelector(getUserRoles);
    const location = useLocation();

    if (!roles?.length) {
        return <>{children}</>;
    }

    const isRouteAvailable = userRoles?.some((role) => roles?.includes(role));

    if (!isRouteAvailable) {
        return <Navigate state={{ from: location }} to={getRouteForbidden()} replace />;
    }

    return <>{children}</>;
};
