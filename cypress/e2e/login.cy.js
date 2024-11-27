describe('FashionHub login Page Tests', () => {
    beforeEach(() => {
      cy.fixture('data.json').as('data')
    })
  
    it('should login with valid credentials', function() {
      cy.visit(this.data.loginPageUrl)
      cy.login(this.data.loginUsername, this.data.loginPassword)
      cy.url().should('not.include', this.data.loginPageUrl)
      cy.get('.account-page h2').should('have.text', this.data.succefullLoginMessageText)
    })
  })