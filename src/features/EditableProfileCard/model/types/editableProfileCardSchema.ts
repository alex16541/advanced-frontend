import { Profile, ProfileErrors } from 'entity/Profile';

export enum ProfileValidateErrors {
    NO_DATA = 'NO_DATA',
    INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
    INCORRECT_AGE = 'INCORRECT_AGE',
    INCORRECT_EMAIL = 'INCORRECT_EMAIL',
    SERVER_ERROR = 'SERVER_ERROR'
}

export interface EditableProfileCardSchema {
    data?: Profile;
    form?: Profile;
    isLoading: boolean;
    error?: ProfileErrors;
    readonly: boolean;
    validateErrors?: ProfileValidateErrors[];
}
