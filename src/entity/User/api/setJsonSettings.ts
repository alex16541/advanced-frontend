import { rtkApi } from '@/shared/api/rtkApi';

import { JsonSettings } from '../model/types/jsonSettings';
import { User } from '../model/types/userSchema';

interface SetJsonSettingsOptions {
    userId: string | number;
    jsonSettings: JsonSettings;
}

const extendedApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        setJsonSettings: build.mutation<User, SetJsonSettingsOptions>({
            query: ({ userId, jsonSettings }) => ({
                url: `/users/${userId}`,
                method: 'PATCH',
                body: {
                    jsonSettings,
                },
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useSetJsonSettingsMutation } = extendedApi;
export const setJsonSettings = extendedApi.endpoints.setJsonSettings.initiate;
