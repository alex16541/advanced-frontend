import { EditableProfileCardSchema } from '../../types/editableProfileCardSchema';
import { ProfileValidateErrors } from '../../consts/profile';
import { validateProfileData } from './validateProfileData';

describe('validateProfileData', () => {
    test('should work with empty state', async () => {
        const result = validateProfileData();

        expect(result).toEqual([ProfileValidateErrors.NO_DATA]);
    });

    test('valid value', async () => {
        const profile: DeepPartial<EditableProfileCardSchema> = {
            form: {
                username: 'user123',
                firstname: 'firstname',
                lastname: 'userLastname',
                age: 32,
                city: 'City123',
                email: 'user@mail.com',
            },
        };

        const result = validateProfileData(profile as EditableProfileCardSchema);

        expect(result).toEqual([]);
    });

    test('incorrect all', async () => {
        const profile: DeepPartial<EditableProfileCardSchema> = {
            form: {
                username: 'user123',
                city: 'City123',
                age: 120,
            },
        };

        const result = validateProfileData(profile as EditableProfileCardSchema);

        expect(result).toEqual([
            ProfileValidateErrors.INCORRECT_USER_DATA,
            ProfileValidateErrors.INCORRECT_AGE,
            ProfileValidateErrors.INCORRECT_EMAIL,
        ]);
    });

    test('incorrect firstname', async () => {
        const profile: DeepPartial<EditableProfileCardSchema> = {
            form: {
                username: 'user123',
                firstname: '',
                lastname: 'userLastname',
                age: 32,
                city: 'City123',
                email: 'user@mail.com',
            },
        };

        const result = validateProfileData(profile as EditableProfileCardSchema);

        expect(result).toEqual([ProfileValidateErrors.INCORRECT_USER_DATA]);
    });

    test('incorrect lastname', async () => {
        const profile: DeepPartial<EditableProfileCardSchema> = {
            form: {
                username: 'user123',
                firstname: 'firstname',
                lastname: '',
                age: 32,
                city: 'City123',
                email: 'user@mail.com',
            },
        };

        const result = validateProfileData(profile as EditableProfileCardSchema);

        expect(result).toEqual([ProfileValidateErrors.INCORRECT_USER_DATA]);
    });

    test('incorrect age', async () => {
        const profile: DeepPartial<EditableProfileCardSchema> = {
            form: {
                username: 'user123',
                firstname: 'firstname',
                lastname: 'lastname',
                age: 120,
                city: 'City123',
                email: 'user@mail.com',
            },
        };

        const result = validateProfileData(profile as EditableProfileCardSchema);

        expect(result).toEqual([ProfileValidateErrors.INCORRECT_AGE]);
    });

    test('incorrect email', async () => {
        const profile: DeepPartial<EditableProfileCardSchema> = {
            form: {
                username: 'user123',
                firstname: 'firstname',
                lastname: 'lastname',
                age: 32,
                city: 'City123',
                email: '',
            },
        };

        const result = validateProfileData(profile as EditableProfileCardSchema);

        expect(result).toEqual([ProfileValidateErrors.INCORRECT_EMAIL]);
    });
});
