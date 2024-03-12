import { RouteProps } from 'react-router-dom';
import { UserRoles } from '@/entity/User';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    roles?: UserRoles[];
};
