import 'app/styles/index.scss';
import { Story } from '@storybook/react';
import { Theme } from '../../../app/providers/ThemeProvider';

export const ThemeDecorator = (
    theme: Theme,
    isRootDecorator: boolean = false,
) => (StoryComponent: Story) => {
    if (!isRootDecorator) {
        setTimeout(() => {
            document.getElementById('root').className = theme;
        }, 1);
    } else {
        document.getElementById('root').className = theme;
    }

    return (
        <div className={theme}>
            <StoryComponent />
        </div>
    );
};
