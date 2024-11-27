describe('FashionHub Main Page Tests', () => {
  beforeEach(() => {
    cy.fixture('data.json').as('data')
  })

  it('should check there are no console errors visiting the main page', function() {
    cy.checkConsoleErrors('/')
  })

  it('should verify all links return 200 or 30x status codes', function() {
    cy.visit('/')
    cy.verifyLinks('a[href]', this.data.validStatusCodes, this.data.invalidStatusCodes)
  })
})