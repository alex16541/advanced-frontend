import { USER_LOCALSTORAGE_KEY } from 'src/shared/consts/localstorage';

export const login = (username = 'testuser', password = '123') => {
    cy.log(`Logging in as ${username}`);

    cy.request({
        method: 'POST',
        url: 'http://localhost:3001/login',
        body: {
            username,
            password,
        },
    }).then(({ body }) => {
        window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(body));
    });
};
