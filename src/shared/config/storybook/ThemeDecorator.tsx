// eslint-disable-next-line alex16541-fsd-imports-path-checker/layers-imports
import '@/app/styles/index.scss';
import { StoryFn } from '@storybook/react';

import { Theme } from '@/shared/consts/theme';

export const ThemeDecorator =
    (theme: Theme, isRootDecorator: boolean = false) =>
    (StoryComponent: StoryFn) => {
        if (!isRootDecorator) {
            setTimeout(() => {
                const root = document.getElementById('storybook-root');
                if (root) root.className = `root ${theme}`;
            }, 1);
        } else {
            const root = document.getElementById('storybook-root');
            if (root) root.className = `root ${theme}`;
        }

        return (
            <div className={theme}>
                <StoryComponent />
            </div>
        );
    };
