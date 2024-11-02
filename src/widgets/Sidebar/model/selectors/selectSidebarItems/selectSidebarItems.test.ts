import { StateSchema } from '@/app/providers/StoreProvider';

import { selectSidebarItems } from './selectSidebarItems';

describe('selectSidebarItems', () => {
    test('should return sidebar items without auth', () => {
        const state: DeepPartial<StateSchema> = {
            user: {},
        };
        expect(selectSidebarItems(state as StateSchema)).toHaveLength(1);
    });

    test('should return sidebar items with auth', () => {
        const state: DeepPartial<StateSchema> = {
            user: {
                authData: {
                    id: '1',
                },
            },
        };
        expect(selectSidebarItems(state as StateSchema)).toHaveLength(3);
    });
});
