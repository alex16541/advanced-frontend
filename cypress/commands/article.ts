const article = {
    title: 'Статья про IT',
    subtitle: 'Что это такое?',
    img: 'https://dev-updates-uploads.s3.ap-south-1.amazonaws.com/'
    + '1665673562977-Best%20way%20to%20learn%20javascript.jpg',
    views: '123123',
    createdAt: '12.10.2020',
    userId: '3',
    type: [
        'it',
    ],
    blocks: [
        {
            id: '1',
            type: 'TEXT',
            title: 'LOREM',
            paragraphs: [
                'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ',
            ],
        },
    ],
};

export const createArticle = (userId: string) => cy.request({
    method: 'POST',
    url: 'http://localhost:3001/articles',
    headers: {
        Authorization: 'asdf',
    },
    body: {
        ...article,
        userId,
    },
}).then((responce) => responce.body.id);

export const deleteArticle = (articleId: string) => cy.request({
    method: 'DELETE',
    headers: {
        Authorization: 'asdf',
    },
    url: `http://localhost:3001/articles/${articleId}?_dependent=comments,articles-rating`,
});

declare global {
  namespace Cypress {
    interface Chainable {
      createArticle(userId: string): Chainable<string>,
      deleteArticle(articleId: string): Chainable<void>,
    }
  }
}
