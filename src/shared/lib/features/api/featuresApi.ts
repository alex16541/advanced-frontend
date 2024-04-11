import { rtkApi } from '@/shared/api/rtkApi';
import { FeatureFlags } from '@/shared/types/featureFlags';

interface SetFeaturesOptions {
    userId: string | number;
    featureFlags: Partial<FeatureFlags>;
}

const extendedApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        updateFeatures: build.mutation<void, SetFeaturesOptions>({
            query: ({ userId, featureFlags: features }) => ({
                url: `/users/${userId}`,
                method: 'PATCH',
                body: {
                    features,
                },
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useUpdateFeaturesMutation } = extendedApi;
export const updateFeatures = extendedApi.endpoints.updateFeatures.initiate;
