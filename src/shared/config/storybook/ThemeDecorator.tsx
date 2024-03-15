// eslint-disable-next-line alex16541-fsd-imports-path-checker/layers-imports
import '@/app/styles/index.scss';
import { Story } from '@storybook/react';

import { Theme } from '@/shared/const/theme';

export const ThemeDecorator = (
    theme: Theme,
    isRootDecorator: boolean = false,
) => (StoryComponent: Story) => {
    if (!isRootDecorator) {
        setTimeout(() => {
            const root = document.getElementById('root');
            if (root) root.className = `root ${theme}`;
        }, 1);
    } else {
        const root = document.getElementById('root');
        if (root) root.className = `root ${theme}`;
    }

    return (
        <div className={theme}>
            <StoryComponent />
        </div>
    );
};
