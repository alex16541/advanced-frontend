import { StoryFn } from '@storybook/react';
import { Suspense } from 'react';

// eslint-disable-next-line alex16541-fsd-imports-path-checker/layers-imports
import { PageLoader } from '@/widgets/PageLoader';

export const SuspenseDecorator = (StoryComponent: StoryFn) => (
    // eslint-disable-next-line i18next/no-literal-string
    <Suspense fallback={<PageLoader text="Загрузка компонента..." />}>
        <StoryComponent />
    </Suspense>
);
