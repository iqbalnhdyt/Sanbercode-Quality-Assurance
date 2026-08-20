class LoginPage {

  visit() {
    cy.visit('/web/index.php/auth/login');
  }

  username() {
    return cy.get('input[name="username"]');
  }

  password() {
    return cy.get('input[name="password"]');
  }

  loginButton() {
    return cy.get('button[type="submit"]');
  }

  errorMessage() {
    return cy.contains('Invalid credentials');
  }

  requiredMessage() {
    return cy.contains('Required');
  }

  dashboardTitle() {
    return cy.contains('Dashboard');
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
    this.loginButton().click();
  }

  login(username, password) {
    this.typeUsername(username);
    this.typePassword(password);
    this.clickLogin();
  }
}

export default new LoginPage();