import { Countries, Currency } from 'shared/const/common';

export interface Profiel {
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

export interface ProfileSchema {
    data?: Profiel,
    isLoading: boolean,
    error?: string,
    readonly: boolean
}
