import { EditableProfileCardSchema } from '../../types/editableProfileCardSchema';
import { ProfileValidateErrors } from '../../consts/profile';

const emailRegex = /\S+@\S+\.\S+/;

export const validateProfileData = (profile?: EditableProfileCardSchema) => {
    if (!profile) return [ProfileValidateErrors.NO_DATA];

    const { form } = profile;
    const errors: ProfileValidateErrors[] = [];

    if (!form?.firstname || !form?.lastname) {
        errors.push(ProfileValidateErrors.INCORRECT_USER_DATA);
    }

    if (Number(form?.age) > 100) {
        errors.push(ProfileValidateErrors.INCORRECT_AGE);
    }

    if (!emailRegex.test(form?.email || '')) {
        errors.push(ProfileValidateErrors.INCORRECT_EMAIL);
    }

    return errors;
};
