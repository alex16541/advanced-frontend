import { Countries, Currency } from 'shared/const/common';

export interface Profile {
    'firstname': string,
    'lastname': string,
    'username': string,
    'age': number,
    'country': Countries,
    'city': string,
    'currency': Currency,
    'phone': string,
    'email': string,
    'photo': string,
}

export enum ProfileErrors {
    UNKNOWN_ERROR
}

export interface ProfileSchema {
    data?: Profile,
    isLoading: boolean,
    error?: ProfileErrors,
    readonly: boolean
}
