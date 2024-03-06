import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserRoles, getUserRoles } from '@/entity/User';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { useAppSelector } from '@/shared/hooks/useAppSelector';

interface RequireRolesProps {
    children: ReactNode,
    roles?: UserRoles[],
}

export const RequireRoles = ({ children, roles }: RequireRolesProps) => {
    const userRoles = useAppSelector(getUserRoles);
    const location = useLocation();

    if (!roles?.length) {
        return (
            <>
                {children}
            </>
        );
    }

    const isRouteAvailable = userRoles?.some((role) => roles?.includes(role));

    if (!isRouteAvailable) {
        return <Navigate to={RoutePath.forbidden} state={{ from: location }} replace />;
    }

    return (
        <>
            {children}
        </>
    );
};
