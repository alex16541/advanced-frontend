// eslint-disable-next-line alex16541-fsd-imports-path-checker/layers-imports
import '@/app/styles/index.scss';
import { StoryFn } from '@storybook/react';

export const StyleDecorator = (StoryComponent: StoryFn) => (
    <div style={{ padding: 20 }}>
        <StoryComponent />
    </div>
);
