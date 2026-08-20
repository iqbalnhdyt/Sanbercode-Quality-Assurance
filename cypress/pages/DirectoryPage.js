class DirectoryPage {

  menuDirectory() {
    return cy.contains(
      'span',
      'Directory',
      { timeout: 20000 }
    );
  }


  pageTitle() {
    return cy.contains(
      'h6',
      'Directory',
      { timeout: 20000 }
    );
  }


  employeeNameInput() {
    return cy.get(
      'input[placeholder="Type for hints..."]',
      { timeout: 20000 }
    );
  }


  jobTitleDropdown() {
    return cy.get(
      '.oxd-select-text',
      { timeout: 20000 }
    ).eq(0);
  }


  locationDropdown() {
    return cy.get(
      '.oxd-select-text',
      { timeout: 20000 }
    ).eq(1);
  }


  searchButton() {
    return cy.get(
      'button[type="submit"]',
      { timeout: 20000 }
    );
  }


  resetButton() {
    return cy.contains(
      'button',
      'Reset',
      { timeout: 20000 }
    );
  }


  resultCards() {
    return cy.get(
      '.orangehrm-directory-card',
      { timeout: 20000 }
    );
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
      .and('not.be.disabled')
      .click();
  }


  clickReset() {
    this.resetButton()
      .should('be.visible')
      .click();
  }

}

export default new DirectoryPage();