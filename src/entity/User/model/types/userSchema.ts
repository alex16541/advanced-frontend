import { FeatureFlags } from '@/shared/types/featureFlags';

import { UserRoles } from '../consts/user';

export interface User {
    id: string;
    username: string;
    profileId: string;
    avatar?: string;
    roles?: UserRoles[];
    features?: FeatureFlags;
}

export interface UserSchema {
    authData?: User;
    _inited: boolean;
}
