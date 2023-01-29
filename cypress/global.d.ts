// add new command to the existing Cypress interface
type User = { name: string, email: string, password: string }
declare global {
  namespace Cypress {
    interface Chainable {
      signUpUser: (user?: User) => void,
      loginUser: (user?: User) => void,
      logout: () => void
    }
  }
}

export { }
