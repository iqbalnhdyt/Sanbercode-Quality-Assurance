describe('OrangeHRM - Login Feature', () => {

  beforeEach(() => {
    cy.on('uncaught:exception', (err) => {
      if (err.message.includes("Cannot read properties of undefined (reading 'response')")) {
        return false;
      }
    });

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

  it('TC01 - Memastikan halaman Login dapat diakses', () => {
    cy.url().should('include', '/auth/login');
  });

  it('TC02 - Memastikan textbox Username dapat diakses', () => {
    cy.get('input[name="username"]')
      .should('be.visible');
  });

  it('TC03 - Memastikan textbox Password dapat diakses', () => {
    cy.get('input[name="password"]')
      .should('be.visible');
  });

  it('TC04 - Memastikan tombol Login dapat diklik', () => {
    cy.get('button[type="submit"]')
      .should('be.visible')
      .and('contain', 'Login');
  });

  it('TC05 - Memastikan Username dapat diisi', () => {
    cy.get('input[name="username"]')
      .type('Admin')
      .should('have.value', 'Admin');
  });

  it('TC06 - Memastikan Password dapat diisi', () => {
    cy.get('input[name="password"]')
      .type('admin123')
      .should('have.value', 'admin123');
  });

  it('TC07 - Login berhasil dengan Kredensial Valid', () => {
    cy.get('input[name="username"]')
      .type('Admin');

    cy.get('input[name="password"]')
      .type('admin123');

    cy.get('button[type="submit"]')
      .click();

    cy.url()
      .should('include', '/dashboard');

    cy.get('.oxd-topbar-header-breadcrumb')
      .should('contain', 'Dashboard');
  });

  it('TC08 - Memastikan berhasil Logout', () => {
    cy.get('input[name="username"]')
      .should('be.visible')
      .type('Admin');

    cy.get('input[name="password"]')
      .should('be.visible')
      .type('admin123');

    cy.get('button[type="submit"]')
      .should('be.visible')
      .click();

    cy.url()
      .should('include', '/dashboard');

    cy.get('.oxd-topbar-header-breadcrumb')
      .should('contain', 'Dashboard');

    cy.get('.oxd-userdropdown-tab')
      .should('be.visible')
      .click();

    cy.contains('Logout')
      .should('be.visible')
      .click();

    cy.url()
      .should('include', '/auth/login');

    cy.get('input[name="username"]')
      .should('be.visible');

    cy.get('input[name="password"]')
      .should('be.visible');
  });

  it('TC09 - Memastikan pesan error saat menginput Username yang salah', () => {
    cy.get('input[name="username"]')
      .type('WrongUser');

    cy.get('input[name="password"]')
      .type('admin123');

    cy.get('button[type="submit"]')
      .click();

    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('contain', 'Invalid credentials');
  });

  it('TC10 - Memastikan pesan error saat menginput Password yang salah', () => {
    cy.get('input[name="username"]')
      .type('Admin');

    cy.get('input[name="password"]')
      .type('WrongPassword');

    cy.get('button[type="submit"]')
      .click();

    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('contain', 'Invalid credentials');
  });

  it('TC11 - Memastikan tampilan Required ketika Username kosong', () => {
    cy.get('button[type="submit"]')
      .click();

    cy.get('.oxd-input-group')
      .should('contain', 'Required');
  });

  it('TC12 - Memastikan tampilan Required ketika Password kosong', () => {
    cy.get('input[name="username"]')
      .type('Admin');

    cy.get('button[type="submit"]')
      .click();

    cy.get('.oxd-input-group')
      .should('contain', 'Required');
  });

});