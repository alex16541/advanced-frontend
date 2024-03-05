import { rtkApi } from '@/shared/api/rtkApi';
import { Notification } from '../model/types/notification';

const extendedApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        fetchNotifications: build.query<Notification[], string | number>({
            query: (userId) => ({
                url: '/notifications',
                method: 'GET',
                params: {
                    userId,
                },
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useFetchNotificationsQuery } = extendedApi;
