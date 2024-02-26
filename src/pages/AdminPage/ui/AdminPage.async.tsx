import { lazy } from 'react';

export const AdminPageAsync = lazy(
    () => new Promise((resolve) => {
        // @ts-ignore
        setTimeout(() => resolve(import('./AdminPage')), 500);
    }),
);
