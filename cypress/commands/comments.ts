export const addComment = (comment = 'Nice try!') => {
    cy.selectByTestId('CommentForm.Input').type(comment);
    cy.selectByTestId('CommentForm.Submit').click();
};

declare global {
  namespace Cypress {
    interface Chainable {
      addComment(comment?: string): Chainable<void>
    }
  }
}
