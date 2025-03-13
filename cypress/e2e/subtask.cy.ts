beforeEach(() => {
  cy.visit('/')
  cy.addBoard('General')
  cy.addTask('New Task')
})

describe('Subtask', () => {
  it('should add a subtask', () => {
    cy.getByTestId('add-subtask-button').click()
    cy.getByTestId('add-subtask-input').type(`Subtask{enter}`)
    cy.getByTestId('subtask-list').first().should('contain', 'Subtask')
  })
  it('should delete a subtask', () => {
    cy.addSubtask('Subtask')
    cy.getByTestId('delete-subtask-button').click()
    cy.getByTestId('subtask-list').first().should('not.contain', 'Subtask')
  })
  it('should edit a subtask', () => {
    cy.addSubtask('Subtask')
    cy.getByTestId('edit-subtask-input').first().clear().type('Edited Subtask').blur()
    cy.getByTestId('subtask-list').first().should('contain', 'Edited Subtask')
  })
  it('should check and uncheck a subtask', () => {
    cy.addSubtask('Subtask')
    cy.getByTestId('subtask-checkbox').click()
    cy.getByTestId('subtask-checkbox-input').should('be.checked')
    cy.getByTestId('subtask-checkbox').click()
    cy.getByTestId('subtask-checkbox-input').should('not.be.checked')
  })
  it('should reorder subtasks', () => {
    cy.addSubtask('First Subtask')
    cy.addSubtask('Last Subtask')

    cy.getByTestId('subtask').first().as('firstSubtask')
    cy.get('@firstSubtask').focus().pressSpace().pressSpace().move('down').pressSpace()

    cy.getByTestId('subtask').first().should('contain', 'Last Subtask')
    cy.getByTestId('subtask').last().should('contain', 'First Subtask')
  })
  it('should autosave subtasks in localStorage', () => {
    cy.addSubtask('Subtask 1')
    cy.addSubtask('Subtask 2')

    cy.reload()

    cy.getByTestId('subtask-list').first().should('contain', 'Subtask 1')
    cy.getByTestId('subtask-list').first().should('contain', 'Subtask 2')
  })
})
