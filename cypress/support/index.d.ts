// load the global Cypress types
/// <reference types="cypress" />
// load the 3rd party command

import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
    }
  }
}
