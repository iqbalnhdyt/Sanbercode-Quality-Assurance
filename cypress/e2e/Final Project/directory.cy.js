import loginPage from '../../pages/LoginPage';
import directoryPage from '../../pages/DirectoryPage';

describe('Final Project - OrangeHRM Directory - POM', () => {

  let loginData;
  let directoryData;

  before(() => {

    cy.fixture('loginData').then((data) => {
      loginData = data;
    });

    cy.fixture('directoryData').then((data) => {
      directoryData = data;
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

    loginPage.login(
      loginData.validUser.username,
      loginData.validUser.password
    );

    cy.url()
      .should('include', '/dashboard');

    directoryPage.openDirectory();

  });

  it('TC01 - Halaman Directory berhasil dibuka', () => {

    cy.url()
      .should('include', '/directory');

    directoryPage.pageTitle()
      .should('be.visible');

    directoryPage.employeeNameInput()
      .should('be.visible');

    directoryPage.searchButton()
      .should('be.visible');

  });

  it('TC02 - Kolom Employee Name dapat diisi', () => {

    directoryPage.typeEmployeeName(
      directoryData.employee.name
    );

    directoryPage.employeeNameInput()
      .should(
        'have.value',
        directoryData.employee.name
      );

  });

  it('TC03 - Tombol Search dapat digunakan', () => {

    cy.intercept(
      'GET',
      '**/api/v2/directory/employees*'
    ).as('directorySearch');

    directoryPage.clickSearch();

    cy.wait('@directorySearch')
      .its('request.method')
      .should('eq', 'GET');

  });

  it('TC04 - Tombol Reset dapat digunakan', () => {

    directoryPage.typeEmployeeName(
      directoryData.employee.name
    );

    cy.intercept(
      'GET',
      '**/api/v2/directory/employees*'
    ).as('resetDirectory');

    directoryPage.clickReset();

    cy.wait('@resetDirectory')
      .its('request.method')
      .should('eq', 'GET');

    directoryPage.resetButton()
      .should('be.visible');

  });

  it('TC05 - Pencarian Directory berhasil menampilkan data', () => {

    cy.intercept(
      'GET',
      '**/api/v2/directory/employees*'
    ).as('searchDirectory');

    directoryPage.clickSearch();

    cy.wait('@searchDirectory')
      .its('response.statusCode')
      .should('eq', 200);

  });

  it('TC06 - Pencarian Employee yang tidak terdaftar', () => {

    cy.intercept(
      'GET',
      '**/api/v2/directory/employees*'
    ).as('invalidEmployeeSearch');

    directoryPage.typeEmployeeName(
      directoryData.invalidEmployee.name
    );

    directoryPage.clickSearch();

    cy.wait('@invalidEmployeeSearch')
      .its('request.method')
      .should('eq', 'GET');

  });

  it('TC07 - Dropdown Job Title dapat diakses', () => {

    directoryPage.jobTitleDropdown()
      .should('be.visible')
      .click();

    cy.get('.oxd-select-dropdown')
      .should('be.visible');

  });

  it('TC08 - Dropdown Location dapat diakses', () => {

    directoryPage.locationDropdown()
      .should('be.visible')
      .click();

    cy.get('.oxd-select-dropdown')
      .should('be.visible');

  });

});