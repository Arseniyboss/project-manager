declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(testId: string): Chainable<Element>
      addBoard(board: string): Chainable<Element>
      addTask(task: string): Chainable<Element>
      pressSpace(): Chainable<Element>
    }
  }
}

export {}
