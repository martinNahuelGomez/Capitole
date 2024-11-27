describe('FashionHub Page Tests', () => {
    beforeEach(() => {
      cy.fixture('data.json').as('data')
    })
  
    it('should list open pull requests in CSV format', function() {
      cy.visit(this.data.pullRequestsUrl)
      cy.extractPullRequests('pull_requests.csv')
    })
  })