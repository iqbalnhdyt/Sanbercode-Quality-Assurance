class RecruitmentPage {

  recruitmentMenu() {
    return cy.contains('span', 'Recruitment', {
      timeout: 20000
    });
  }

  pageTitle() {
    return cy.contains('h6', 'Recruitment', {
      timeout: 20000
    });
  }

  vacanciesTab() {
    return cy.contains('a', 'Vacancies', {
      timeout: 20000
    });
  }

  candidatesTab() {
    return cy.contains('a', 'Candidates', {
      timeout: 20000
    });
  }

  addButton() {
    return cy.contains('button', 'Add', {
      timeout: 20000
    });
  }

  candidateNameInput() {
    return cy.get('input[name="firstName"]', {
      timeout: 20000
    });
  }

  middleNameInput() {
    return cy.get('input[name="middleName"]', {
      timeout: 20000
    });
  }

  lastNameInput() {
    return cy.get('input[name="lastName"]', {
      timeout: 20000
    });
  }

  emailInput() {
    return cy.get(
      'input[placeholder="Type here"]',
      { timeout: 20000 }
    ).eq(0);
  }

  contactNumberInput() {
    return cy.get(
      'input[placeholder="Type here"]',
      { timeout: 20000 }
    ).eq(1);
  }

  saveButton() {
    return cy.get(
      'button[type="submit"]',
      { timeout: 20000 }
    );
  }

  cancelButton() {
    return cy.contains('button', 'Cancel', {
      timeout: 20000
    });
  }

  requiredMessage() {
    return cy.get(
      '.oxd-input-field-error-message',
      { timeout: 20000 }
    );
  }

  openRecruitment() {
    this.recruitmentMenu()
      .should('be.visible')
      .click();
  }

}

export default new RecruitmentPage();