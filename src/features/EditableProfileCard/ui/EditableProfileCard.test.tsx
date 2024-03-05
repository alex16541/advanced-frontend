import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/shared/lib/tests/renderWithProviders/renderWithProviders';
import { Profile } from '@/entity/Profile';
import { Country } from '@/entity/Country';
import { Currency } from '@/entity/Currency';
import userEvent from '@testing-library/user-event';
import { User } from '@/entity/User';
import { $api } from '@/shared/api/api';
import { EditableProfileCard as ProfileCard } from './EditableProfileCard';
import { editableProfileCardReducer } from '../model/slices/editableProfileCardSlice';

const EditableProfileCard = () => <ProfileCard profileId={1} />;

const profile: Profile = {
    id: '1',
    username: 'user 1',
    firstname: 'user',
    lastname: '1',
    age: 23,
    city: 'Moskow',
    email: 'user@gmail.com',
    country: Country.Russia,
    currency: Currency.RUB,
};

const authData: User = {
    id: '1',
    username: 'user 1',
    profileId: '1',
};

const options = {
    initialState: {
        user: {
            authData,
        },
        editableProfileCard: {
            readonly: true,
            data: profile,
            form: profile,

        },
    },
    asyncReducers: {
        editableProfileCard: editableProfileCardReducer,
    },
};

describe('features/Editable profile card tests', () => {
    test('Exist in document', () => {
        renderWithProviders(<EditableProfileCard />, options);
        const card = screen.getByTestId('EditableProfileCard');
        expect(card).toBeInTheDocument();
    });

    test('Turn on edit mode', async () => {
        renderWithProviders(<EditableProfileCard />, options);

        const editButton = screen.getByTestId('EditableProfileCardHeader.EditButton');
        await userEvent.click(editButton);

        const saveButton = screen.getByTestId('EditableProfileCardHeader.SaveButton');
        expect(saveButton).toBeInTheDocument();

        const cancelButton = screen.getByTestId('EditableProfileCardHeader.CancelButton');
        expect(cancelButton).toBeInTheDocument();
    });

    test('Restore form on cancel after edit', async () => {
        renderWithProviders(<EditableProfileCard />, options);

        const editButton = screen.getByTestId('EditableProfileCardHeader.EditButton');
        await userEvent.click(editButton);

        const firstname = screen.getByTestId('ProfileCard.Firstname');
        await userEvent.clear(firstname);
        await userEvent.type(firstname, 'admin');

        const lastname = screen.getByTestId('ProfileCard.Lastname');
        await userEvent.clear(lastname);
        await userEvent.type(lastname, 'admin');

        expect(firstname).toHaveValue('admin');
        expect(lastname).toHaveValue('admin');

        const cancelButton = screen.getByTestId('EditableProfileCardHeader.CancelButton');
        await userEvent.click(cancelButton);

        expect(firstname).toHaveValue('user');
        expect(lastname).toHaveValue('1');
    });

    test('Should render validation errors', async () => {
        renderWithProviders(<EditableProfileCard />, options);

        const editButton = screen.getByTestId('EditableProfileCardHeader.EditButton');
        await userEvent.click(editButton);

        const firstname = screen.getByTestId('ProfileCard.Firstname');
        await userEvent.clear(firstname);

        const lastname = screen.getByTestId('ProfileCard.Lastname');
        await userEvent.clear(lastname);

        expect(firstname).toHaveValue('');
        expect(lastname).toHaveValue('');

        const saveButton = screen.getByTestId('EditableProfileCardHeader.SaveButton');
        await userEvent.click(saveButton);

        const errors = screen.getByTestId('EditableProfileCardErrors');
        expect(errors).toBeInTheDocument();
    });

    test('Successfull save profile', async () => {
        const mockPutReq = jest.spyOn($api, 'put');

        renderWithProviders(<EditableProfileCard />, options);

        const editButton = screen.getByTestId('EditableProfileCardHeader.EditButton');
        await userEvent.click(editButton);

        const lastname = screen.getByTestId('ProfileCard.Lastname');
        await userEvent.type(lastname, 'user');

        const saveButton = screen.getByTestId('EditableProfileCardHeader.SaveButton');
        await userEvent.click(saveButton);

        expect(mockPutReq).toHaveBeenCalled();
    });
});
