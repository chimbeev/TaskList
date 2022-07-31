describe('example to-do app', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })

    
  it('can add new todo items', () => {
    const newItem = 'Новая Задача'
    cy.get('[data-test=new-todo]').type(`${newItem}{enter}`)

    cy.get('.todo-list li')
      .should('have.length', 3)
      .last()
      .should('have.text', newItem)
  })
})  