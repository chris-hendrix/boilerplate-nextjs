export { }

describe('Boilerplate app', () => {
  it('App can be opened', () => {
    cy.visit('/')
    cy.contains('Boilerplate')
  })
})
