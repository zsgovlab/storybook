/* eslint-disable jest/expect-expect */
import { visitExample } from '../helper';

describe('Navigation', () => {
  before(() => {
    visitExample('official-storybook');
  });

  it('should search navigation item', () => {
    cy.get('#storybook-explorer-searchfield').click().clear().type('persisting the action logger');

    cy.get('.sidebar-container a')
      .should('contain', 'Persisting the action logger')
      .and('not.contain', 'a11y');
  });

  it('should display no results after searching a non-existing navigation item', () => {
    cy.get('#storybook-explorer-searchfield').click().clear().type('zzzzzzzzzz');

    cy.get('.sidebar-container').should('contain', 'This filter resulted in 0 results');
  });
});

describe('Routing', () => {
  before(() => {
    visitExample('official-storybook');
  });

  it('should navigate to story addons-a11y-basebutton--default', () => {
    cy.get('#addons-a11y-basebutton--label').click();

    cy.url().should('include', 'path=/story/addons-a11y-basebutton--label');
  });

  it('should directly visit a certain story and render correctly', () => {
    visitExample('official-storybook', '?path=/story/addons-a11y-basebutton--label');

    cy.preview().should('contain.text', 'Testing the a11y addon');
  });
});
