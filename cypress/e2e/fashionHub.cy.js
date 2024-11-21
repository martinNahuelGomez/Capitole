describe('FashionHub Page Tests', () => {
  beforeEach(() => {
    cy.fixture('locators.json').as('locators')
    cy.fixture('data.json').as('data')
  })

  it('should check there are no console errors visiting the main page', function() {
    cy.checkConsoleErrors('/')
  })

  it('should verify all links return 200 or 30x status codes', function() {
    cy.visit('/')
    cy.verifyLinks(this.locators.links, this.data.validStatusCodes, this.data.invalidStatusCodes)
  })

  it('should login with valid credentials', function() {
    cy.visit(this.data.loginPageUrl)
    cy.get(this.locators.username).type(this.data.loginUsername)
    cy.get(this.locators.password).type(this.data.loginPassword)
    cy.get(this.locators.loginButton).submit()
    cy.url().should('not.include', this.data.loginPageUrl)
    cy.get(this.locators.succefullLoginMessage).should('have.text', this.data.succefullLoginMessageText)
  })

  it('should list open pull requests in CSV format', function() {
    cy.visit(this.data.pullRequestsUrl)
    cy.extractPullRequests(
      this.locators.pullRequestRow,
      this.locators.pullRequestName,
      this.locators.pullRequestDate,
      this.locators.pullRequestAuthor,
      'pull_requests.csv'
    )
  })
})