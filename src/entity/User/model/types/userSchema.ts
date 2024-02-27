import { UserRoles } from '../consts/user';

export interface User {
    id: string;
    username: string;
    profileId: string;
    avatar?: string;
    roles?: UserRoles[];
}

export interface UserSchema {
    authData?: User;
    _inited: boolean;
}
