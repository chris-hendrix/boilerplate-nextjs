/// <reference types="cypress" />
export { }

describe('User tests', () => {
  it('User can sign up only once', () => {
    cy.signUpUser()
    cy.contains('button', 'Sign in with Credentials')
    cy.signUpUser()
    cy.contains('button', 'Sign in with Credentials').should('not.exist')
  })

  it('User can sign in and sign out', () => {
    cy.loginUser()
    cy.get('[class~="signUpMenuButton"').should('not.exist')
    cy.logout()
    cy.get('[class~="signUpMenuButton"').should('exist')
  })

  // TODO users page
})
