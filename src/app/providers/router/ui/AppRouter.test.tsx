import { screen } from '@testing-library/react';

import { UserRoles } from '@/entity/User';
import { getRouteAdmin, getRouteProfile } from '@/shared/consts/router';
import { renderWithProviders } from '@/shared/lib/tests/renderWithProviders/renderWithProviders';

import AppRouter from './AppRouter';

describe('app/router/AppRouter', () => {
    test('Рендерит страницу', async () => {
        renderWithProviders(<AppRouter />, {
            initialEntrie: '/',
        });

        const page = await screen.findByTestId('main-page');

        expect(page).toBeInTheDocument();
    });

    test('Страница не найдена', async () => {
        renderWithProviders(<AppRouter />, {
            initialEntrie: '/asdfasdfasdf',
        });

        const page = await screen.findByTestId('not-found-page');

        expect(page).toBeInTheDocument();
    });

    test('Рендерит Профиль', async () => {
        renderWithProviders(<AppRouter />, {
            initialEntrie: getRouteProfile('1'),
            initialState: {
                user: {
                    authData: {
                        id: '1',
                    },
                },
            },
        });

        const page = await screen.findByTestId('profile-page');

        expect(page).toBeInTheDocument();
    });

    test('Рендерит Админку', async () => {
        renderWithProviders(<AppRouter />, {
            initialEntrie: getRouteAdmin(),
            initialState: {
                user: {
                    authData: {
                        id: '1',
                        roles: [UserRoles.ADMIN],
                    },
                },
            },
        });

        const page = await screen.findByTestId('admin-page');

        expect(page).toBeInTheDocument();
    });

    test('Редиректит на ForbiddenPage если нет роли admin', async () => {
        renderWithProviders(<AppRouter />, {
            initialEntrie: getRouteAdmin(),
            initialState: {
                user: {
                    authData: {
                        id: '1',
                    },
                },
            },
        });

        const page = await screen.findByTestId('forbidden-page');

        expect(page).toBeInTheDocument();
    });

    test('Редиректит на MainPage если пользователь не авторизован (AdminPage)', async () => {
        renderWithProviders(<AppRouter />, {
            initialEntrie: getRouteAdmin(),
        });

        const page = await screen.findByTestId('main-page');

        expect(page).toBeInTheDocument();
    });

    test('Редиректит на MainPage если пользователь не авторизован (ProfilePage)', async () => {
        renderWithProviders(<AppRouter />, {
            initialEntrie: getRouteProfile('1'),
        });

        const page = await screen.findByTestId('main-page');

        expect(page).toBeInTheDocument();
    });
});
