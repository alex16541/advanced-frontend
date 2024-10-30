import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { LAST_USED_THEME } from '@/shared/consts/localstorage';

import { setJsonSettings } from '../../../api/api';
import { getJsonSettings } from '../../selectors/getJsonSettings';
import { JsonSettings } from '../../types/jsonSettings';

export const changeUserJsonSettings = createAsyncThunk<JsonSettings, JsonSettings, ThunkConfig<JsonSettings>>(
    'user/changeUserJsonSettings',
    async (newSettings, thunkAPI) => {
        const { rejectWithValue, extra, getState, dispatch } = thunkAPI;

        try {
            const state = getState();
            const currentSettings = getJsonSettings(state);

            const userId = state.user.authData?.id;

            if (!userId) throw new Error();
            const response = await dispatch(
                setJsonSettings({
                    userId,
                    jsonSettings: {
                        ...currentSettings,
                        ...newSettings,
                    },
                }),
            ).unwrap();

            localStorage.setItem(LAST_USED_THEME, JSON.stringify(response.jsonSettings?.theme));

            if (!response.jsonSettings) {
                throw new Error();
            }

            return response.jsonSettings;
        } catch (error) {
            return rejectWithValue({});
        }
    },
);
