import loginPage from '../../pages/LoginPage';

describe('OrangeHRM - Login Feature - POM', () => {

  let loginData;

  before(() => {
    cy.fixture('loginData').then((data) => {
      loginData = data;
    });
  });

  beforeEach(() => {
    loginPage.visit();

      loginPage.username()
        .should('be.visible')
        .and('not.be.disabled');

    loginPage.password()
        .should('be.visible')
        .and('not.be.disabled');

  });

  it('TC01 - Halaman login berhasil dibuka', () => {
    cy.url().should('include', '/web/index.php/auth/login');

    loginPage.username().should('be.visible');
    loginPage.password().should('be.visible');
    loginPage.loginButton().should('be.visible');
  });

  it('TC02 - Kolom Username dapat diisi', () => {
    loginPage.typeUsername(loginData.validUser.username);

    loginPage.username()
      .should('have.value', loginData.validUser.username);
  });

  it('TC03 - Kolom Password dapat diisi', () => {
    loginPage.typePassword(loginData.validUser.password);

    loginPage.password()
      .should('have.value', loginData.validUser.password);
  });

  it('TC04 - Tombol Login dapat digunakan', () => {
    loginPage.loginButton()
      .should('be.visible')
      .and('be.enabled');
  });

  it('TC05 - Login dengan Username dan Password valid', () => {
    loginPage.login(
      loginData.validUser.username,
      loginData.validUser.password
    );

    cy.url().should('include', '/dashboard/index');

    loginPage.dashboardTitle()
      .should('be.visible');
  });

  it('TC06 - Login dengan Username salah dan Password benar', () => {
    loginPage.login(
      loginData.invalidUser.username,
      loginData.validUser.password
    );

    loginPage.errorMessage()
      .should('be.visible');
  });

  it('TC07 - Login dengan Username benar dan Password salah', () => {
    loginPage.login(
      loginData.validUser.username,
      loginData.invalidUser.password
    );

    loginPage.errorMessage()
      .should('be.visible');
  });

  it('TC08 - Login dengan Username dan Password salah', () => {
    loginPage.login(
      loginData.invalidUser.username,
      loginData.invalidUser.password
    );

    loginPage.errorMessage()
      .should('be.visible');
  });

  it('TC09 - Login tanpa mengisi Username', () => {
    loginPage.typePassword(loginData.validUser.password);
    loginPage.clickLogin();

    loginPage.requiredMessage()
      .should('be.visible');
  });

  it('TC10 - Login tanpa mengisi Password', () => {
    loginPage.typeUsername(loginData.validUser.username);
    loginPage.clickLogin();

    loginPage.requiredMessage()
      .should('be.visible');
  });

});