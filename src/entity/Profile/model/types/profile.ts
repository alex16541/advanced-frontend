import { Country } from '@/entity/Country';
import { Currency } from '@/entity/Currency';

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
