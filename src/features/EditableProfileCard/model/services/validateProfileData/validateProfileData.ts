import { ProfileValidateError } from '../../consts/profile';
import { EditableProfileCardSchema } from '../../types/editableProfileCardSchema';

const emailRegex = /\S+@\S+\.\S+/;

export const validateProfileData = (profile?: EditableProfileCardSchema): ProfileValidateError[] => {
    if (!profile) return ['NO_DATA'];

    const { form } = profile;
    const errors: ProfileValidateError[] = [];

    if (!form?.firstname || !form?.lastname) {
        errors.push('INCORRECT_USER_DATA');
    }

    if (Number(form?.age) > 100) {
        errors.push('INCORRECT_AGE');
    }

    if (!emailRegex.test(form?.email || '')) {
        errors.push('INCORRECT_EMAIL');
    }

    return errors;
};
