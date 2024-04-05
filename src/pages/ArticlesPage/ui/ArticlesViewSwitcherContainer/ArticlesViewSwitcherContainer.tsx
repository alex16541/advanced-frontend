import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { ArticlesListView } from '@/entity/Article';
import { ArticleViewSwitcher } from '@/features/ArticleViewSwitcher';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';

import { selectArticlesPageView } from '../../model/selectors/articlesPageSelectors';
import { articlesPageActions } from '../../model/slices/articlesPageSlice';

interface ArticlesViewSwitcherContainerProps {
    className?: string;
}

const ArticlesViewSwitcherContainer = (props: ArticlesViewSwitcherContainerProps) => {
    const { className } = props;
    const view = useSelector(selectArticlesPageView);
    const dispatch = useAppDispatch();

    const onViewSwitch = useCallback(
        (view: ArticlesListView) => {
            dispatch(articlesPageActions.setView(view));
        },
        [dispatch],
    );

    return <ArticleViewSwitcher className={className} view={view} onViewSwitch={onViewSwitch} />;
};

const Memoized = memo(ArticlesViewSwitcherContainer);

export { Memoized as ArticlesViewSwitcherContainer };
