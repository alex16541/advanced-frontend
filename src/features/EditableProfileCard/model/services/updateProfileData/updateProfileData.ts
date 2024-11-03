import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Profile, ProfileError } from '@/entity/Profile';
import { getAuthData, User, userActions } from '@/entity/User';
import { AppError } from '@/shared/types/AppError';

import { ProfileValidateError } from '../../consts/profile';
import { getProfileData } from '../../selectors/getProfileData/getProfileData';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { validateProfileData } from '../validateProfileData/validateProfileData';

export const updateProfileData = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<ProfileError | ProfileValidateError[]>
>('profile/updateProfileData', async (_, thunkAPI) => {
    const { rejectWithValue, extra, getState, dispatch } = thunkAPI;

    try {
        const state = getState();

        const authData = getAuthData(state);
        if (!authData) {
            return rejectWithValue(['NO_DATA']);
        }

        const profileData = getProfileData(state);

        const validationErrors = validateProfileData(state.editableProfileCard);
        if (validationErrors.length > 0) {
            return rejectWithValue(validationErrors);
        }
        const profileForm = getProfileForm(state);
        const [responseProfile, responseUser] = await Promise.all([
            extra.api.put<Profile>(`/profile/${profileData?.id}`, profileForm),
            extra.api.patch<User>(`/users/${authData?.id}`, { avatar: profileForm?.photo || '' }),
        ]);

        if (responseProfile.status !== 200) {
            throw new AppError(responseProfile.status);
        }

        if (responseUser.status !== 200) {
            throw new AppError(responseUser.status);
        }

        if (profileForm?.photo) dispatch(userActions.setAvatar(profileForm.photo));

        return responseProfile.data;
    } catch (e) {
        if (AppError.isApiError(e)) {
            return rejectWithValue(e.code);
        }

        return rejectWithValue('UNKNOWN_ERROR');
    }
});
