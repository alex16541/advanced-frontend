import { Profile, ProfileErrors } from '@/entity/Profile';

import { ProfileValidateErrors } from '../consts/profile';

export interface EditableProfileCardSchema {
    data?: Profile;
    form?: Profile;
    isLoading: boolean;
    error?: ProfileErrors;
    readonly: boolean;
    validateErrors?: ProfileValidateErrors[];
}
