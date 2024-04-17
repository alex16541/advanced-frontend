import { StoryFn } from '@storybook/react';

import { setFeatureFlags } from '@/shared/lib/features';
import { FeatureFlags } from '@/shared/types/featureFlags';

export const FeatureFlagsDecorator = (features: FeatureFlags) => (Component: StoryFn) => {
    setFeatureFlags(features);

    return <Component />;
};
