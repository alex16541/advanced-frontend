/// <reference types="cypress" />

import * as article from 'cypress/commands/article';
import * as comments from 'cypress/commands/comments';
import * as common from 'cypress/commands/common';
import * as profile from 'cypress/commands/profile';
import * as rating from 'cypress/commands/rating';

Cypress.Commands.addAll(common);
Cypress.Commands.addAll(profile);
Cypress.Commands.addAll(article);
Cypress.Commands.addAll(comments);
Cypress.Commands.addAll(rating);

export {};
