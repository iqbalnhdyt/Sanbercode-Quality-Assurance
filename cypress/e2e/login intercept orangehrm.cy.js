describe('OrangeHRM - Login Feature dengan Intercept', () => {

  beforeEach(() => {
    cy.on('uncaught:exception', (err) => {
      if (
        err.message.includes(
          "Cannot read properties of undefined (reading 'response')"
        )
      ) {
        return false;
      }
    });

    cy.visit(
      'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
    );
  });


  it('TC01 - Login berhasil dengan kredensial valid', () => {

    cy.intercept('POST', '**/auth/validate').as('loginValid');
    
    cy.get('input[name="username"]')
      .type('Admin');

    cy.get('input[name="password"]')
      .type('admin123');

    cy.get('button[type="submit"]')
      .click();

    cy.wait('@loginValid')
      .its('response.statusCode')
      .should('eq', 302);

    cy.url()
      .should('include', '/dashboard');

    cy.get('.oxd-topbar-header-breadcrumb')
      .should('contain', 'Dashboard');
  });


  it('TC02 - Menampilkan error ketika username salah', () => {

    cy.intercept('POST', '**/web/index.php/auth/validate')
      .as('wrongUsername');

    cy.get('input[name="username"]')
      .type('WrongUser');

    cy.get('input[name="password"]')
      .type('admin123');

    cy.get('button[type="submit"]')
      .click();

    cy.wait('@wrongUsername')
      .its('response.statusCode')
      .should('eq', 302);

    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('contain', 'Invalid credentials');
  });


  it('TC03 - Menampilkan error ketika password salah', () => {

    cy.intercept('POST', '**/web/index.php/auth/validate', (req) => {
        expect(req.body).to.include('Admin');
        expect(req.body).to.include('WrongPassword');
    }).as('wrongPassword');

    cy.get('input[name="username"]')
        .type('Admin');

    cy.get('input[name="password"]')
        .type('WrongPassword');

    cy.get('button[type="submit"]')
        .click();

    cy.wait('@wrongPassword')
        .its('response.statusCode')
        .should('eq', 302);

    cy.get('.oxd-alert-content-text')
        .should('be.visible')
        .and('contain', 'Invalid credentials');
    });


  it('TC04 - Menampilkan Required ketika username kosong', () => {

    cy.intercept('POST', '**/auth/validate').as('emptyUsername');

    cy.get('input[name="password"]')
      .type('admin123');

    cy.get('button[type="submit"]')
      .click();

    cy.get('.oxd-input-group')
      .should('contain', 'Required');

    cy.get('input[name="username"]')
      .should('have.value', '');
  });


  it('TC05 - Menampilkan Required ketika password kosong', () => {

    cy.intercept('POST', '**/auth/validate').as('emptyPassword');

    cy.get('input[name="username"]')
      .type('Admin');

    cy.get('button[type="submit"]')
      .click();

    cy.get('.oxd-input-group')
      .should('contain', 'Required');

    cy.get('input[name="password"]')
      .should('have.value', '');
  });


  it('TC06 - Menampilkan Required ketika username dan password kosong', () => {

    cy.intercept('POST', '**/auth/validate?empty=true')
      .as('emptyCredential');

    cy.get('button[type="submit"]')
      .click();

    cy.get('.oxd-input-group')
      .should('contain', 'Required');

    cy.get('input[name="username"]')
      .should('have.value', '');

    cy.get('input[name="password"]')
      .should('have.value', '');
  });


  it('TC07 - Login berhasil kemudian logout', () => {

    cy.intercept('POST', '**/auth/validate').as('loginLogout');

    cy.get('input[name="username"]')
      .type('Admin');

    cy.get('input[name="password"]')
      .type('admin123');

    cy.get('button[type="submit"]')
      .click();

    cy.wait('@loginLogout');

    cy.url()
      .should('include', '/dashboard');

    cy.get('.oxd-topbar-header-breadcrumb')
      .should('contain', 'Dashboard');

    cy.get('.oxd-userdropdown-tab')
      .click();

    cy.contains('Logout')
      .click();

    cy.url()
      .should('include', '/auth/login');
  });


  it('TC08 - Memastikan user diarahkan ke Dashboard', () => {

    cy.intercept('GET', '**/dashboard/index')
      .as('dashboardPage');

    cy.get('input[name="username"]')
      .type('Admin');

    cy.get('input[name="password"]')
      .type('admin123');

    cy.get('button[type="submit"]')
      .click();

    cy.url()
      .should('include', '/dashboard');

    cy.get('.oxd-topbar-header-breadcrumb')
      .should('be.visible')
      .and('contain', 'Dashboard');
  });

});