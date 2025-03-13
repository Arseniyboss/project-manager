type Direction = 'down' | 'up' | 'right' | 'left'

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(testId: string): Chainable<Element>
      addBoard(board: string): Chainable<Element>
      addTask(task: string): Chainable<Element>
      addSubtask(subtask: string): Chainable<Element>
      pressSpace(): Chainable<Element>
      move(direction: Direction): Chainable<Element>
    }
  }
}

export {}
