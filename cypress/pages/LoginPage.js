class LoginPage {

  visit() {
    cy.visit(
      'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
      {
        failOnStatusCode: false
      }
    );

    this.username()
      .should('be.visible');

    this.password()
      .should('be.visible');

    this.loginButton()
      .should('be.visible');
  }


  username() {
    return cy.get(
      'input[name="username"]',
      { timeout: 20000 }
    );
  }


  password() {
    return cy.get(
      'input[name="password"]',
      { timeout: 20000 }
    );
  }


  loginButton() {
    return cy.get(
      'button[type="submit"]',
      { timeout: 20000 }
    );
  }


  errorMessage() {
    return cy.get(
      '.oxd-alert-content-text',
      { timeout: 20000 }
    );
  }


  requiredMessage() {
    return cy.get(
      '.oxd-input-field-error-message',
      { timeout: 20000 }
    );
  }


  typeUsername(username) {
    this.username()
      .should('be.visible')
      .clear()
      .type(username);
  }


  typePassword(password) {
    this.password()
      .should('be.visible')
      .clear()
      .type(password);
  }


  clickLogin() {
    this.loginButton()
      .should('be.visible')
      .and('not.be.disabled')
      .click();
  }


  login(username, password) {
    this.typeUsername(username);
    this.typePassword(password);
    this.clickLogin();
  }

}

export default new LoginPage();