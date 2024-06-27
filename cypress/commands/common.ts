import { User } from '@/entity/User';
import { USER_LOCALSTORAGE_KEY } from '@/shared/consts/localstorage';

export const login = (username = 'testuser', password = '123') => {
    cy.log(`Logging in as ${username}`);

    return cy
        .request({
            method: 'POST',
            url: 'http://localhost:3001/login',
            body: {
                username,
                password,
            },
        })
        .then(({ body }) => {
            window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(body));
            return body;
        });
};

export const selectByTestId = (testId: string) => cy.get(`[data-testid="${testId}"]`);

declare global {
    namespace Cypress {
        interface Chainable {
            login(username?: string, password?: string): Chainable<User>;
            selectByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
        }
    }
}
