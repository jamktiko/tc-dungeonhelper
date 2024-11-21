describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:4200/retables');

    cy.get('div').contains('Settlement').click();

    
  })
})