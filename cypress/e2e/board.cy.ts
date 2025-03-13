beforeEach(() => {
  cy.visit('/')
})

describe('Board', () => {
  it('should add a board', () => {
    cy.getByTestId('add-board-button').click()
    cy.getByTestId('add-board-input').type(`General{enter}`)
    cy.getByTestId('edit-board-input').should('have.value', 'General')
  })
  it('should delete a board', () => {
    cy.addBoard('General')
    cy.getByTestId('delete-board-button').click()
    cy.getByTestId('board').should('not.exist')
  })
  it('should edit a board', () => {
    cy.addBoard('General')
    cy.getByTestId('edit-board-input').clear().type('Edited Board').blur()
    cy.getByTestId('edit-board-input').should('have.value', 'Edited Board')
    cy.get('h1').should('have.text', 'Edited Board')
  })
  it('should reorder boards', () => {
    cy.addBoard('Board 1')
    cy.addBoard('Board 2')

    cy.getByTestId('board').first().as('firstBoard')
    cy.get('@firstBoard').focus().pressSpace().move('down').pressSpace()

    cy.getByTestId('edit-board-input').first().should('have.value', 'Board 2')
    cy.getByTestId('edit-board-input').last().should('have.value', 'Board 1')
  })
  it('should autosave boards in localStorage', () => {
    cy.addBoard('Board 1')
    cy.addBoard('Board 2')

    cy.reload()

    cy.getByTestId('edit-board-input').first().should('have.value', 'Board 1')
    cy.getByTestId('edit-board-input').last().should('have.value', 'Board 2')
  })
})
