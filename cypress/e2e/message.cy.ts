/// <reference types="cypress" />
import { createNewMessage, createNewUser } from '../support'

const user = createNewUser()

describe('Message tests ', () => {
  it('Signed in user can send and see message', () => {
    const message = createNewMessage()
    cy.signUpUser(user)
    cy.loginUser(user)
    cy.get('[class~="messageInput"]').type(message.content)
    cy.get('[class~="sendMessageButton"').click()
    cy.contains(message.content)
  })
})
