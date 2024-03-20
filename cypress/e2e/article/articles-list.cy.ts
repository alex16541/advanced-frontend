import { getRouteArticles } from 'src/shared/consts/router';

describe('Споисок статей', () => {
    beforeEach(() => {
        cy.login().then((user) => {
            cy.visit(getRouteArticles());
        });
    });
    it('Подгружет статьи', () => {
        cy.selectByTestId('LargeArticleCard').should('have.length.above', 1);
    });
});
