Cypress.Commands.add('checkConsoleErrors', (url) => {
    let windowErrorSpy
  
    Cypress.on('window:before:load', (win) => {
      windowErrorSpy = cy.spy(win.console, 'error')
    })
  
    cy.visit(url).then(() => {
      expect(windowErrorSpy).to.not.be.called
    })
})

Cypress.Commands.add('login', (loginUsername, loginPassword) => {
  cy.get('#username').type(loginUsername)
  cy.get('#password').type(loginPassword)
  cy.get('#loginForm').submit()
})

Cypress.Commands.add('verifyLinks', (linksLocator, validStatusCodes, invalidStatusCodes) => {
    cy.get(linksLocator).each(($el) => {
      const href = $el.attr('href')
      const fullUrl = href.startsWith('http') ? href : Cypress.config('baseUrl').replace(/fashionhub\/$/, '') + href
      cy.request(fullUrl).then((response) => {
        expect(response.status).to.be.oneOf(validStatusCodes)
        expect(response.status).to.not.be.oneOf(invalidStatusCodes)
    })
  })
})

Cypress.Commands.add('extractPullRequests', (filename) => {
    cy.get('.js-issue-row').then(($rows) => {
      const prData = []
  
      $rows.each((index, row) => {
        const $row = Cypress.$(row)
        const prName = $row.find('.link-gray-dark').text().trim()
        const createdDate = $row.find('relative-time').attr('datetime')
        const author = $row.find('.opened-by a').text().trim()
  
        prData.push({ prName, createdDate, author })
      })
  
      const csvContent = 'PR Name,Created Date,Author\n' + prData.map(pr => `${pr.prName},${pr.createdDate},${pr.author}`).join('\n')
  
      cy.task('writeCsv', { filename, content: csvContent })
    })
})