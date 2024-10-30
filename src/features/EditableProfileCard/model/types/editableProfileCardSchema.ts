import { Profile, ProfileError } from '@/entity/Profile';

import { ProfileValidateError } from '../consts/profile';

export interface EditableProfileCardSchema {
    data?: Profile;
    form?: Profile;
    isLoading: boolean;
    error?: ProfileError;
    readonly: boolean;
    validateErrors?: ProfileValidateError[];
}
