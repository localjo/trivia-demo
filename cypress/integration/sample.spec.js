describe('Quiz Integration Test', function() {
  it('Starting the quiz works', function() {
    cy.visit('http://localhost:3000/');
    cy.contains('Welcome to the Trivia Challenge');
    cy.contains('Begin').click();
    cy.url().should('include', '/quiz/1');
  });
});
