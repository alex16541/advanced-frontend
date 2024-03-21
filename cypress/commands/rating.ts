export const setRating = (rate = 3, feedback = 'Nice try!') => {
    cy.selectByTestId(`StarRating.Star.${rate}`).click();
    cy.selectByTestId('RatingCard.FeedbackInput').type(feedback);
    cy.selectByTestId('RatingCard.Accept').click();
};

declare global {
    namespace Cypress {
        interface Chainable {
            setRating(rating?: number | string, feedback?: string): Chainable<void>;
        }
    }
}
