import { lazy } from 'react';

export const ArticlePublishPageAsync = lazy(
    () =>
        new Promise((resolve) => {
            // @ts-ignore
            setTimeout(() => resolve(import('./ArticlePublishPage')), 1500);
        }),
);
