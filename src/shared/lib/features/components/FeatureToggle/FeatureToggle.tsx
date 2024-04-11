import { ReactElement } from 'react';

import { FeatureFlags } from '@/shared/types/featureFlags';

import { getFeatureFlag } from '../../lib/featureFlags';

interface FeatureToggleProps {
    feature: keyof FeatureFlags;
    on?: ReactElement;
    off?: ReactElement;
}

export const FeatureToggle = (props: FeatureToggleProps) => {
    const { feature: name, on = null, off = null } = props;
    const flag = getFeatureFlag(name);

    if (flag) return on;

    return off;
};
