import { selectByTestId } from 'helpers/selectByTestId';

describe('Роутинг', () => {
    describe('Пользователь НЕ авторизован', () => {
        it('Переход на главную страницу', () => {
            cy.visit('/');
            cy.get(selectByTestId('main-page')).should('exist');
        });

        it('Редирект на главную при заходе на страницу профиля', () => {
            cy.visit('/profile/1');
            cy.get(selectByTestId('main-page')).should('exist');
        });

        it('Переход на несущестующую страницу', () => {
            cy.visit('/asdfasdfasdf');
            cy.get(selectByTestId('not-found-page')).should('exist');
        });
    });
    describe('Пользователь авторизован', () => {
        beforeEach(() => {
            cy.login();
        });

        it('Переходит на страницу профиля', () => {
            cy.visit('/profile/3');
            cy.get(selectByTestId('profile-page')).should('exist');
        });

        it('Переходит на страницу статей', () => {
            cy.visit('/articles');
            cy.get(selectByTestId('articles-page')).should('exist');
        });
    });
});
