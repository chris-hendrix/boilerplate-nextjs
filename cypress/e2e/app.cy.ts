/// <reference types="cypress" />
export { }

const user = {
  name: `Patch Adams ${new Date().getTime()}`,
  email: `patch-adams-${new Date().getTime()}@email.com`,
  password: 'Abcd1234!'
}

const message = {
  content: `hello-world-${new Date().getTime()}`
}

const signUpUser = (user) => {
  cy.visit('/signup')
  cy.contains('button', 'Or sign in').click()
  cy.get('input[name="name"]').type(user.name)
  cy.get('input[name="email"]').type(user.email)
  cy.get('input[name="password"]').type(user.password)
  cy.get('input[name="cpassword"]').type(user.password)
  cy.contains('button', 'Sign up').click()
}

const signInUser = (user) => {
  cy.visit('/api/auth/signin')
  cy.get('input[name="email"]').type(user.email)
  cy.get('input[name="password"]').type(user.password)
  cy.contains('button', 'Sign in with Credentials').click()
}

describe('Boilerplate app', () => {

  it('App can be opened', () => {
    cy.visit('/')
    cy.contains('Boilerplate')
  })

  it('User can sign up', () => {
    signUpUser(user)
    cy.contains('button', 'Sign in with Credentials')
  })

  it('User with existing email cannot sign up', () => {
    signUpUser(user)
    cy.contains('button', 'Sign in with Credentials').should('not.exist')
  })

  it('User can sign in and sign out', () => {
    signInUser(user)
    cy.contains('li', 'Logout')
    // TODO sign out
  })

  it('Signed in user can send and see message', () => {
    signInUser(user)
    cy.get('[class~="MuiInputBase-inputAdornedEnd"]').type(message.content)
    cy.get('[class~="send-message-button"').click()
    cy.contains(message.content)
  })

  // TODO users page
})
