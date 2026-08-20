describe('OrangeHRM - Login Feature dengan Intercept', () => {

  const loginUrl =
    'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

  const usernameInput = 'input[name="username"]';
  const passwordInput = 'input[name="password"]';
  const loginButton = 'button[type="submit"]';


  const ensureLoginPageReady = () => {

    cy.get('body').then(($body) => {

      if ($body.find(usernameInput).length === 0) {
        cy.reload();
      }

    });

    cy.get(usernameInput, { timeout: 15000 })
      .should('be.visible');

    cy.get(passwordInput, { timeout: 15000 })
      .should('be.visible');

    cy.get(loginButton, { timeout: 15000 })
      .should('be.visible');

  };


  beforeEach(() => {

    cy.on('uncaught:exception', (err) => {

      if (
        err.message.includes(
          "Cannot read properties of undefined"
        ) ||
        err.message.includes(
          "Cannot read properties of null"
        )
      ) {
        return false;
      }

    });

    cy.visit(loginUrl);

  });

  it('TC01 - Login berhasil dengan kredensial valid', () => {

    cy.intercept(
      'POST',
      '**/auth/validate'
    ).as('loginValid');

    cy.get(usernameInput, { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type('Admin');

    cy.get(passwordInput, { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type('admin123');

    cy.get(loginButton, { timeout: 10000 })
      .should('be.visible')
      .click();

    cy.wait('@loginValid')
      .then((interception) => {

        expect(interception.request.method)
          .to.equal('POST');

        expect(interception.response.statusCode)
          .to.equal(302);

      });

    cy.url()
      .should('include', '/dashboard');

    cy.get('.oxd-topbar-header-breadcrumb')
      .should('be.visible')
      .and('contain', 'Dashboard');
  });

  it('TC02 - Menampilkan error ketika username salah', () => {

    cy.intercept(
      'POST',
      '**/auth/validate'
    ).as('wrongUsername');


    cy.get(usernameInput)
      .clear()
      .type('WrongUser');

    cy.get(passwordInput)
      .clear()
      .type('admin123');

    cy.get(loginButton)
      .click();

    cy.wait('@wrongUsername')
      .then((interception) => {

        expect(interception.request.method)
          .to.equal('POST');

        expect(interception.response.statusCode)
          .to.equal(302);

      });

    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('contain', 'Invalid credentials');

    cy.url()
      .should('include', '/auth/login');
  });

  it('TC03 - Menampilkan error ketika password salah', () => {

    cy.intercept(
      'POST',
      '**/auth/validate',
      (req) => {

        expect(req.body)
          .to.include('Admin');

        expect(req.body)
          .to.include('WrongPassword');

      }
    ).as('wrongPassword');

    cy.get(usernameInput, { timeout: 15000 })
        .should('be.visible')
        .clear()
        .type('Admin');

      cy.get(passwordInput, { timeout: 15000 })
        .should('be.visible')
        .clear()
        .type('WrongPassword');

      cy.get(loginButton, { timeout: 15000 })
        .should('be.visible')
        .click();


      cy.wait('@wrongPassword', {
        timeout: 15000
      }).then((interception) => {

        expect(interception.response.statusCode)
          .to.equal(302);

   });

    cy.get('.oxd-alert-content-text', {
      timeout: 15000
    })
      .should('be.visible')
      .and('contain', 'Invalid credentials');

  });

    it('TC05 - User dapat membuka halaman Forgot Password', () => {

    cy.intercept(
      'GET',
      '**/auth/requestPasswordResetCode*'
    ).as('forgotPasswordPage');

    ensureLoginPageReady();

    cy.contains(
      'Forgot your password?',
      { timeout: 15000 }
    )
      .should('be.visible')
      .click();

    cy.wait('@forgotPasswordPage', {
      timeout: 15000
    }).then((interception) => {

      expect(interception.request.method)
        .to.equal('GET');

      expect(interception.request.url)
        .to.include('/auth/requestPasswordResetCode');

      expect(interception.response.statusCode)
        .to.be.oneOf([200, 304]);

    });

    cy.url({ timeout: 15000 })
      .should(
        'include',
        '/auth/requestPasswordResetCode'
      );

    cy.contains(
      'Reset Password',
      { timeout: 15000 }
    )
      .should('be.visible');

  });

  it('TC05 - User dapat membuka halaman Forgot Password', () => {

    cy.intercept(
      'GET',
      '**/auth/requestPasswordResetCode*'
    ).as('forgotPasswordPage');

    cy.get('.orangehrm-login-forgot')
      .should('be.visible')
      .click();

    cy.wait('@forgotPasswordPage')
      .then((interception) => {

        expect(interception.request.method)
          .to.equal('GET');

        expect(interception.response.statusCode)
          .to.be.oneOf([200, 304]);

      });

    cy.url()
      .should(
        'include',
        '/auth/requestPasswordResetCode'
      );

    cy.contains('Reset Password')
      .should('be.visible');
  });

  it('TC06 - Menampilkan Required ketika username dan password kosong', () => {

    cy.intercept(
      'POST',
      '**/auth/validate'
    ).as('emptyCredential');

    ensureLoginPageReady();

    cy.get(loginButton, { timeout: 15000 })
      .should('be.visible')
      .and('not.be.disabled')
      .click();

    cy.get('.oxd-input-group', { timeout: 10000 })
      .should('contain', 'Required');

    cy.get(usernameInput)
      .should('have.value', '');

    cy.get(passwordInput)
      .should('have.value', '');

    cy.get('@emptyCredential.all')
      .should('have.length', 0);

  });

  it('TC07 - Login berhasil kemudian logout', () => {

    cy.intercept(
      'POST',
      '**/auth/validate'
    ).as('loginLogout');

    cy.get(usernameInput)
      .clear()
      .type('Admin');

    cy.get(passwordInput)
      .clear()
      .type('admin123');

    cy.get(loginButton)
      .click();

    cy.wait('@loginLogout')
      .then((interception) => {

        expect(interception.response.statusCode)
          .to.equal(302);

      });

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
  });

  it('TC08 - Memastikan user diarahkan ke Dashboard', () => {

    cy.intercept(
      'POST',
      '**/auth/validate'
    ).as('loginDashboard');

    cy.intercept(
      'GET',
      '**/dashboard/index*'
    ).as('dashboardPage');

    ensureLoginPageReady();

    cy.get(usernameInput, { timeout: 15000 })
      .should('be.visible')
      .clear()
      .type('Admin');

    cy.get(passwordInput, { timeout: 15000 })
      .should('be.visible')
      .clear()
      .type('admin123');

    cy.get(loginButton, { timeout: 15000 })
      .should('be.visible')
      .click();

    cy.wait('@loginDashboard', {
      timeout: 15000
    })
      .its('response.statusCode')
      .should('eq', 302);

    cy.wait('@dashboardPage', {
      timeout: 15000
    }).then((interception) => {

      expect(interception.request.method)
        .to.equal('GET');

      expect(interception.request.url)
        .to.include('/dashboard/index');

      expect(interception.response.statusCode)
        .to.be.oneOf([200, 304]);

    });

    cy.url({ timeout: 15000 })
      .should('include', '/dashboard');

    cy.get(
      '.oxd-topbar-header-breadcrumb',
      { timeout: 15000 }
    )
      .should('be.visible')
      .and('contain', 'Dashboard');

  });

  it('TC09 - Memastikan request Login menggunakan method POST', () => {

    cy.intercept(
      'POST',
      '**/auth/validate'
    ).as('validateLoginRequest');

    cy.get(usernameInput)
      .clear()
      .type('Admin');

    cy.get(passwordInput)
      .clear()
      .type('admin123');

    cy.get(loginButton)
      .click();

    cy.wait('@validateLoginRequest')
      .then((interception) => {

        expect(interception.request.method)
          .to.equal('POST');

        expect(interception.request.url)
          .to.include('/auth/validate');

        expect(interception.response)
          .to.exist;

        expect(interception.response.statusCode)
          .to.equal(302);

      });

    cy.url()
      .should('include', '/dashboard');
  });

  it('TC10 - Memastikan request Logout berhasil', () => {

    cy.intercept(
      'POST',
      '**/auth/validate'
    ).as('loginBeforeLogout');

    ensureLoginPageReady();

    cy.get(usernameInput, { timeout: 15000 })
      .should('be.visible')
      .clear()
      .type('Admin');

    cy.get(passwordInput, { timeout: 15000 })
      .should('be.visible')
      .clear()
      .type('admin123');

    cy.get(loginButton, { timeout: 15000 })
      .should('be.visible')
      .click();

    cy.wait('@loginBeforeLogout', {
      timeout: 15000
    })
      .its('response.statusCode')
      .should('eq', 302);

    cy.url({ timeout: 15000 })
      .should('include', '/dashboard');

    cy.intercept(
      'GET',
      '**/auth/logout*'
    ).as('logoutRequest');

    cy.get(
      '.oxd-userdropdown-tab',
      { timeout: 15000 }
    )
      .should('be.visible')
      .click();

    cy.contains('Logout', {
      timeout: 15000
    })
      .should('be.visible')
      .click();

    cy.wait('@logoutRequest', {
      timeout: 15000
    }).then((interception) => {

      expect(interception.request.method)
        .to.equal('GET');

      expect(interception.request.url)
        .to.include('/auth/logout');

      expect(interception.response.statusCode)
        .to.be.oneOf([200, 302]);

    });

    cy.url({ timeout: 15000 })
      .should('include', '/auth/login');

    });

});