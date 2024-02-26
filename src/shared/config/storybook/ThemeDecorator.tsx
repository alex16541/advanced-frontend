import 'app/styles/index.scss';
import { Story } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';

export const ThemeDecorator = (
    theme: Theme,
    isRootDecorator: boolean = false,
) => (StoryComponent: Story) => {
    if (!isRootDecorator) {
        setTimeout(() => {
            const root = document.getElementById('root');
            if (root) root.className = theme;
        }, 1);
    } else {
        const root = document.getElementById('root');
        if (root) root.className = theme;
    }

    return (
        <div className={theme}>
            <StoryComponent />
        </div>
    );
};
