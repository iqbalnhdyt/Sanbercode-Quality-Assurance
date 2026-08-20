import loginPage from '../../pages/LoginPage';

describe('Final Project - OrangeHRM Login - POM', () => {

  let loginData;

  before(() => {
    cy.fixture('loginData').then((data) => {
      loginData = data;
    });
  });

  beforeEach(() => {

    cy.on('uncaught:exception', (err) => {
      if (
        err.message.includes('nextSibling') ||
        err.message.includes(
          "Cannot read properties of undefined (reading 'response')"
        )
      ) {
        return false;
      }
    });

    loginPage.visit();

  });

  it('TC01 - Halaman login berhasil dibuka', () => {

    cy.url()
      .should('include', '/auth/login');

    loginPage.username()
      .should('be.visible');

    loginPage.password()
      .should('be.visible');

    loginPage.loginButton()
      .should('be.visible');

  });

  it('TC02 - Username dapat diisi', () => {

    loginPage.typeUsername(
      loginData.validUser.username
    );

    loginPage.username()
      .should(
        'have.value',
        loginData.validUser.username
      );

  });

  it('TC03 - Password dapat diisi', () => {

    loginPage.typePassword(
      loginData.validUser.password
    );

    loginPage.password()
      .should(
        'have.value',
        loginData.validUser.password
      );

  });

  it('TC04 - Login berhasil dengan kredensial valid', () => {

    cy.intercept(
      'POST',
      '**/auth/validate'
    ).as('loginValid');

    loginPage.login(
      loginData.validUser.username,
      loginData.validUser.password
    );

    cy.url({ timeout: 20000 })
      .should('include', '/dashboard');

  });

  it('TC05 - Login gagal dengan username salah', () => {

    cy.intercept(
      'POST',
      '**/auth/validate'
    ).as('wrongUsername');

    loginPage.login(
      loginData.invalidUser.username,
      loginData.validUser.password
    );

    cy.wait('@wrongUsername')
      .its('request.method')
      .should('eq', 'POST');

    loginPage.errorMessage()
      .should('be.visible')
      .and('contain', 'Invalid credentials');

  });

  it('TC06 - Login gagal dengan password salah', () => {

    cy.intercept(
      'POST',
      '**/auth/validate'
    ).as('wrongPassword');

    loginPage.login(
      loginData.validUser.username,
      loginData.invalidUser.password
    );

    cy.wait('@wrongPassword')
      .then((interception) => {

        expect(interception.request.method)
          .to.eq('POST');

        expect(interception.request.body)
          .to.include(
            loginData.validUser.username
          );

        expect(interception.request.body)
          .to.include(
            loginData.invalidUser.password
          );

      });

    loginPage.errorMessage()
      .should('be.visible')
      .and('contain', 'Invalid credentials');

  });

  it('TC07 - Username wajib diisi', () => {

    loginPage.typePassword(
      loginData.validUser.password
    );

    loginPage.clickLogin();

    loginPage.requiredMessage()
      .should('be.visible');

    loginPage.username()
      .should('have.value', '');

  });

  it('TC08 - Password wajib diisi', () => {

    loginPage.typeUsername(
      loginData.validUser.username
    );

    loginPage.clickLogin();

    loginPage.requiredMessage()
      .should('be.visible');

    loginPage.password()
      .should('have.value', '');

  });

});