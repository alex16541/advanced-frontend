export const editProfile = (firstname: string, lastname: string) => {
    cy.selectByTestId('EditableProfileCardHeader.EditButton').click();
    cy.selectByTestId('ProfileCard.Firstname').clear().type(firstname);
    cy.selectByTestId('ProfileCard.Lastname').clear().type(lastname);
    cy.selectByTestId('EditableProfileCardHeader.SaveButton').click();
};

export const resetProfile = (profileId: string) => {
    cy.request({
        method: 'PUT',
        url: `http://localhost:3001/profile/${profileId}`,
        headers: {
            Authorization: 'asdf',
        },
        body: {
            id: '3',
            firstname: 'user',
            lastname: 'test',
            username: 'testuser',
            age: 66,
            country: 'Russia',
            city: 'Saint-Petersburg',
            currency: 'RUB',
            phone: '89991112255',
            email: 'testuser@gamil.com',
            photo:
                'https://media.istockphoto.com/id/1269703326/vector/pixel-art-8-bit-' +
                'cute-kitten-domestic-pet-saying-meow-isolated-vector.' +
                'jpg?s=612x612&w=0&k=20&c=akgp8uPlUMGNZbnO-bTAksu7f1zER53qwEXExAMirko=',
        },
    });
};

declare global {
    namespace Cypress {
        interface Chainable {
            editProfile(username?: string, password?: string): Chainable<void>;
            resetProfile(profileId: string): Chainable<void>;
        }
    }
}
