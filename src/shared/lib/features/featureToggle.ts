import { FeatureFlags } from '@/shared/types/featureFlags';

import { getFeatureFlag } from './featureFlags';

interface FeatureToggle<T> {
    name: keyof FeatureFlags;
    on?: () => T;
    off?: () => T;
}

export const featureToggle = <T>({ name, on, off }: FeatureToggle<T>) => {
    const isEnabled = getFeatureFlag(name);

    if (isEnabled) return on?.();

    return off?.();
};
