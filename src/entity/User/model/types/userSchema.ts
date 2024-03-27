import { FeatureFlags } from '@/shared/types/featureFlags';

import { UserRoles } from '../consts/user';

import { JsonSettings } from './jsonSettings';

export interface User {
    id: string;
    username: string;
    profileId: string;
    avatar?: string;
    roles?: UserRoles[];
    features?: FeatureFlags;
    jsonSettings?: JsonSettings;
}

export interface UserSchema {
    authData?: User;
    _inited: boolean;
}
