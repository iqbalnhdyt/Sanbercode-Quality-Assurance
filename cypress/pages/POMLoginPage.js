class POMLoginPage {

  visit() {
    cy.visit(
      'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
    );

    cy.get('body', { timeout: 20000 })
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

  forgotPassword() {
    return cy.get(
      '.orangehrm-login-forgot-header',
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

  dashboardTitle() {
    return cy.contains(
      'h6',
      'Dashboard',
      { timeout: 20000 }
    );
  }

  typeUsername(username) {
    this.username()
      .should('be.visible')
      .and('not.be.disabled')
      .clear()
      .type(username);
  }

  typePassword(password) {
    this.password()
      .should('be.visible')
      .and('not.be.disabled')
      .clear()
      .type(password);
  }

  clickLogin() {
    this.loginButton()
      .should('be.visible')
      .click();
  }

  login(username, password) {
    this.typeUsername(username);
    this.typePassword(password);
    this.clickLogin();
  }

}

export default new POMLoginPage();