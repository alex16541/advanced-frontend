import { getQueryParams } from './addQueryParams';

describe('addQueryParams', () => {
    test('with one param', () => {
        const searchParams = {
            sort: 'title',
        };
        const queryParams = getQueryParams(searchParams);

        expect(queryParams).toBe('?sort=title');
    });

    test('with many params', () => {
        const searchParams = {
            sort: 'title',
            order: 'asc',
        };
        const queryParams = getQueryParams(searchParams);

        expect(queryParams).toBe('?sort=title&order=asc');
    });

    test('with one undefined param', () => {
        const searchParams = {
            sort: undefined,
        };
        const queryParams = getQueryParams(searchParams);

        expect(queryParams).toBe('');
    });

    test('with one normal and one undefined params', () => {
        const searchParams = {
            sort: undefined,
            order: 'asc',
        };
        const queryParams = getQueryParams(searchParams);

        expect(queryParams).toBe('?order=asc');
    });
});
