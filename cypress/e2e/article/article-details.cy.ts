import { getRouteArticleDetails } from '@/shared/consts/router';

let articleId = '';

describe('template spec', () => {
    beforeEach(() => {
        cy.login().then((user) => {
            cy.createArticle(user.id).then((id) => {
                articleId = id;
                cy.visit(getRouteArticleDetails(articleId));
            });
        });
    });
    afterEach(() => {
        cy.deleteArticle(articleId);
    });
    it('Загружает статью', () => {
        cy.selectByTestId('ArticleDetails').should('exist');
    });
    it('Загружает рекоммендации', () => {
        cy.selectByTestId('ArticleRecommendationsList').should('exist');
    });
    it.only('Оставляет оценку', () => {
        const rating = 3;
        cy.setRating(rating);
        cy.get('[data-selected=true]').should('have.length', rating);
    });
    it('Оставляет комментарий', () => {
        cy.addComment();
        cy.selectByTestId('CommentCard').should('have.length', 1);
    });
});
