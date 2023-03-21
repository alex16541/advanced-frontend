import { Country } from 'entity/Country/model/types/country';
import { Currency } from 'entity/Currency/model/types/currency';

export interface Profile {
    firstname?: string;
    lastname?: string;
    username?: string;
    age?: number;
    country?: Country;
    city?: string;
    currency?: Currency;
    phone?: string;
    email?: string;
    photo?: string;
}

export enum ProfileErrors {
    UNKNOWN_ERROR = 'UNKNOWN_ERROR',
    SERVER_ERROR = 'SERVER_ERROR',
}

export enum ProfileValidateErrors {
    NO_DATA = 'NO_DATA',
    INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
    INCORRECT_AGE = 'INCORRECT_AGE',
    INCORRECT_EMAIL = 'INCORRECT_EMAIL',
    SERVER_ERROR = 'SERVER_ERROR',
}

export interface ProfileSchema {
    data?: Profile;
    form?: Profile;
    isLoading: boolean;
    error?: ProfileErrors;
    readonly: boolean;
    validateErrors?: ProfileValidateErrors[];
}
