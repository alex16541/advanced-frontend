import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article, ArticleSortField, ArticleType } from '@/entity/Article';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';
import { SortOrder } from '@/shared/types/sort';

import { ArticlesPageErrors } from '../../consts/articlesPage';

interface FetchArticlesListOptions {
    page?: number;
    limit?: number;
    query?: string;
    replace?: boolean;
    sort?: ArticleSortField;
    order?: SortOrder;
    type?: ArticleType;
}

export const fetchArticlesList = createAsyncThunk<
    Article[],
    FetchArticlesListOptions,
    ThunkConfig<ArticlesPageErrors[]>
>('article/fetchArticlesList', async (options, thunkAPI) => {
    const { rejectWithValue, extra, getState } = thunkAPI;
    const { page = 1, limit = 3, query = '', replace = false, sort, order, type } = options;

    try {
        addQueryParams({
            sort,
            order,
            type,
            search: query,
        });

        const response = await extra.api.get<Article[]>('/articles', {
            params: {
                _page: page,
                _limit: limit,
                _expand: 'user',
                _sort: sort,
                _order: order,
                type_like: type === ArticleType.ALL ? undefined : type,
                q: query,
            },
        });

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (error) {
        return rejectWithValue([ArticlesPageErrors.SERVER_ERROR]);
    }
});
