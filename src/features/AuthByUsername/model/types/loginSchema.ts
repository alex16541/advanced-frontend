import { LoginErrors } from '../services/loginByUsername/loginByUsername';

export interface LoginSchema {
    username: string;
    password: string;
    isLoading: boolean;
    error?: LoginErrors;
}
