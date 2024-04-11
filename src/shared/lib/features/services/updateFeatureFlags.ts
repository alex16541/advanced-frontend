import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { FeatureFlags } from '@/shared/types/featureFlags';

import { updateFeatures } from '../api/featuresApi';
import { getAllFeatureFlags } from '../lib/featureFlags';

interface updateFeatureFlagsOptions {
    userId: string | number;
    featureFlags: Partial<FeatureFlags>;
}

export const updateFeatureFlags = createAsyncThunk<void, updateFeatureFlagsOptions, ThunkConfig<string>>(
    'features/updateFeatureFlags',
    async ({ userId, featureFlags }, thunkAPI) => {
        const { rejectWithValue, extra, getState, dispatch } = thunkAPI;

        try {
            await dispatch(
                updateFeatures({
                    userId,
                    featureFlags: {
                        ...getAllFeatureFlags(),
                        ...featureFlags,
                    },
                }),
            ).unwrap();

            window.location.reload();
        } catch (error) {
            rejectWithValue('');
        }
    },
);
