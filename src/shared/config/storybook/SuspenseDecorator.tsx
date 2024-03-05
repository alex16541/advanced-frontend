import { Story } from '@storybook/react';
import { Suspense } from 'react';
import { PageLoader } from '@/widgets/PageLoader';

export const SuspenseDecorator = (StoryComponent: Story) => (
    // eslint-disable-next-line i18next/no-literal-string
    <Suspense fallback={<PageLoader text="Загрузка компонента..." />}>
        <StoryComponent />
    </Suspense>
);
