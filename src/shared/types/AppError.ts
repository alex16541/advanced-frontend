import { AppErrorType } from './errors';

export const AppErrors: Record<AppErrorType, AppErrorType> = {
    FORBIDDEN: 'FORBIDDEN',
    NOT_FOUND: 'NOT_FOUND',
    SERVER_ERROR: 'SERVER_ERROR',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR',
    INVALID_DATA: 'INVALID_DATA',
    INVALID_VALIDATION: 'INVALID_VALIDATION',
    NO_DATA: 'NO_DATA',
};

export class AppError extends Error {
    status: number;

    constructor(status: number, message?: string) {
        super(message);
        this.status = status;
        this.name = 'ApiError';
    }

    getCode(): AppErrorType {
        return AppError.getCode(this.status);
    }

    get code() {
        return this.getCode();
    }

    static isApiError(error: unknown): error is AppError {
        return error instanceof AppError;
    }

    static getCode(status: number): AppErrorType {
        switch (status) {
            case 403:
                return 'FORBIDDEN';
            case 404:
                return 'NOT_FOUND';
            case 500:
                return 'SERVER_ERROR';
            default:
                return 'UNKNOWN_ERROR';
        }
    }

    static getMessage(code: AppErrorType | string): string | undefined {
        const messages: OptionalRecord<AppErrorType, string> = {
            UNKNOWN_ERROR: 'Unknown error',
            SERVER_ERROR: 'Server error',
            INVALID_DATA: 'Invalid data',
            INVALID_VALIDATION: 'Invalid validation',
            NO_DATA: 'No data',
            FORBIDDEN: 'Forbidden',
            NOT_FOUND: 'Not found',
        };

        return messages[code as AppErrorType];
    }
}
