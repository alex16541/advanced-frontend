import { Suspense, lazy } from 'react';

import { Loader } from '@/shared/ui/Loader';

import { ArticleRatingProps } from './ArticleRating';

const ArticleRatingLazy = lazy(
    () => import('./ArticleRating'),
);

export const ArticleRatingAsync = (props: ArticleRatingProps) => (
    <Suspense fallback={<Loader />}>
        <ArticleRatingLazy {...props} />
    </Suspense>
);
