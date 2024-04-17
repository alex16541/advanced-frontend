// eslint-disable-next-line alex16541-fsd-imports-path-checker/layers-imports
import '@/app/styles/index.scss';
import { StoryFn } from '@storybook/react';

import { Theme } from '@/shared/consts/theme';
import { getFeatureFlag } from '@/shared/lib/features';

export const ThemeDecorator =
    (theme: Theme, isRootDecorator: boolean = false) =>
    (StoryComponent: StoryFn) => {
        const isRedisign = getFeatureFlag('isRedesignedApp');

        if (!isRootDecorator) {
            setTimeout(() => {
                const root = document.getElementById('storybook-root');
                if (root) root.className = `root ${theme} ${isRedisign ? 'app_redesigned' : 'app'}`;
            }, 1);
        } else {
            const root = document.getElementById('storybook-root');
            if (root) root.className = `root ${theme} ${isRedisign ? 'app_redesigned' : 'app'}`;
        }

        return (
            <div className={theme}>
                <StoryComponent />
            </div>
        );
    };
