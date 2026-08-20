class DirectoryPage {

  menuDirectory() {
    return cy.contains('Directory');
  }

  pageTitle() {
    return cy.contains('Directory');
  }

  employeeNameInput() {
    return cy.get('input[placeholder="Type for hints..."]');
  }

  jobTitleDropdown() {
    return cy.get('.oxd-select-text').eq(0);
  }

  locationDropdown() {
    return cy.get('.oxd-select-text').eq(1);
  }

  searchButton() {
    return cy.get('button[type="submit"]');
  }

  resetButton() {
    return cy.contains('button', 'Reset');
  }

  resultCards() {
    return cy.get('.orangehrm-directory-card');
  }

  openDirectory() {
    this.menuDirectory()
      .should('be.visible')
      .click();
  }

  typeEmployeeName(name) {
    this.employeeNameInput()
      .should('be.visible')
      .clear()
      .type(name);
  }

  clickSearch() {
    this.searchButton()
      .should('be.visible')
      .click();
  }

  clickReset() {
    this.resetButton()
      .should('be.visible')
      .click();
  }

}

export default new DirectoryPage();