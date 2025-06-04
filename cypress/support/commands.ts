Cypress.Commands.add('getByTestId', (testId) => {
  cy.get(`[data-testid=${testId}]`)
})

Cypress.Commands.add('getCurrentMonthDays', () => {
  cy.get('.react-datepicker__day:not(.react-datepicker__day--outside-month)')
})

Cypress.Commands.add('addBoard', (board) => {
  cy.getByTestId('add-board-button').click()
  cy.getByTestId('add-board-input').type(`${board}{enter}`)
})

Cypress.Commands.add('addTask', (task) => {
  cy.getByTestId('add-task-button').first().click()
  cy.getByTestId('add-task-input').type(`${task}{enter}`)
})

Cypress.Commands.add('addSubtask', (subtask) => {
  cy.getByTestId('add-subtask-button').click()
  cy.getByTestId('add-subtask-input').type(`${subtask}{enter}`)
})

Cypress.Commands.add('pressSpace', { prevSubject: 'element' }, (subject) => {
  cy.wrap(subject).trigger('keydown', { keyCode: 32, force: true })
})

Cypress.Commands.add('move', { prevSubject: 'element' }, (subject, direction) => {
  cy.wrap(subject).type(`{${direction}Arrow}`)
})
