import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { setJsonSettings } from '../../../api/setJsonSettings';
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

            if (!userId) return rejectWithValue({});

            const response = await dispatch(
                setJsonSettings({
                    userId,
                    jsonSettings: {
                        ...currentSettings,
                        ...newSettings,
                    },
                }),
            ).unwrap();

            if (!response.jsonSettings) {
                return rejectWithValue({});
            }

            return response.jsonSettings;
        } catch (error) {
            return rejectWithValue({});
        }
    },
);
