import { Country } from 'entity/Country/model/types/country';
import { Currency } from 'entity/Currency/model/types/currency';

export interface Profile {
    id?: string;
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
