import { Suspense, lazy } from 'react';

import { Loader } from '@/shared/ui/deprecated/Loader';

import { ArticleRatingProps } from './ArticleRating';

const ArticleRatingLazy = lazy(() => import('./ArticleRating'));

export const ArticleRatingAsync = (props: ArticleRatingProps) => (
    // todo: add skeleton
    <Suspense fallback={<Loader />}>
        <ArticleRatingLazy {...props} />
    </Suspense>
);
