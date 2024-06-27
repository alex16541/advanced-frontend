import { editProfile } from 'commands/profile';

import { getRouteProfile } from '@/shared/consts/router';

let profileId = '';

describe('Профиль пользователя', () => {
    beforeEach(() => {
        cy.login().then((user) => {
            profileId = user.id;
            cy.visit(getRouteProfile(profileId));
        });
    });
    afterEach(() => {
        cy.resetProfile(profileId);
    });
    it('Загружает профиль', () => {
        cy.selectByTestId('ProfileCard.Firstname').should('have.value', 'user');
    });
    it('Редактирование', () => {
        const firstname = 'editedFirstname';
        const lastname = 'editedLastname';
        editProfile(firstname, lastname);
        cy.selectByTestId('ProfileCard.Firstname').should('have.value', firstname);
        cy.selectByTestId('ProfileCard.Lastname').should('have.value', lastname);
    });
});
