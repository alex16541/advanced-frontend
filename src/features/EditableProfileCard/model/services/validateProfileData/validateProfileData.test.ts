import { Profile } from '@/entity/Profile';

import { EditableProfileCardSchema } from '../../types/editableProfileCardSchema';

import { validateProfileData } from './validateProfileData';

describe('validateProfileData', () => {
    test('should work with empty state', async () => {
        const result = validateProfileData();

        expect(result).toEqual(['NO_DATA']);
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

        expect(result).toEqual(['INCORRECT_USER_DATA', 'INCORRECT_AGE', 'INCORRECT_EMAIL']);
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

        expect(result).toEqual(['INCORRECT_USER_DATA']);
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

        expect(result).toEqual(['INCORRECT_USER_DATA']);
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

        expect(result).toEqual(['INCORRECT_AGE']);
    });

    test('incorrect email', async () => {
        const profileData: Profile = {
            username: 'user123',
            firstname: 'firstname',
            lastname: 'lastname',
            age: 32,
            city: 'City123',
            email: '',
        };
        const profile: DeepPartial<EditableProfileCardSchema> = {
            form: {
                ...profileData,
            },
        };

        const result = validateProfileData(profile as EditableProfileCardSchema);

        expect(result).toEqual(['INCORRECT_EMAIL']);
    });
});
