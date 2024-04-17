import { LAST_USED_DESIGN } from '@/shared/consts/localstorage';
import { FeatureFlags } from '@/shared/types/featureFlags';

const defaultFeatureFlags: Partial<FeatureFlags> = {
    isRedesignedApp: localStorage.getItem(LAST_USED_DESIGN) === 'new',
};

let featureFlags: FeatureFlags = { ...defaultFeatureFlags };

export const setFeatureFlags = (features?: FeatureFlags) => {
    if (features) {
        featureFlags = features;
    }
};

export const getFeatureFlag = (flag: keyof FeatureFlags) => featureFlags?.[flag] ?? false;

export const getAllFeatureFlags = () => featureFlags;
