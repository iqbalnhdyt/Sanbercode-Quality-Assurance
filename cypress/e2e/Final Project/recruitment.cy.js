import loginPage from '../../pages/LoginPage';
import recruitmentPage from '../../pages/RecruitmentPage';

describe('Final Project - OrangeHRM Recruitment - POM', () => {

  let loginData;
  let recruitmentData;

  before(() => {

    cy.fixture('loginData').then((data) => {
      loginData = data;
    });

    cy.fixture('recruitmentData').then((data) => {
      recruitmentData = data;
    });

  });


  beforeEach(() => {

    cy.on('uncaught:exception', (err) => {

      if (
        err.message.includes('nextSibling') ||
        err.message.includes('Cannot read properties of undefined') ||
        err.message.includes('Cannot read properties of null')
      ) {
        return false;
      }

    });


    loginPage.visit();

    loginPage.login(
      loginData.validUser.username,
      loginData.validUser.password
    );

    cy.url({ timeout: 20000 })
      .should('include', '/dashboard');

    recruitmentPage.openRecruitment();

    cy.url({ timeout: 20000 })
      .should('include', '/recruitment');

  });

  it('TC01 - Menu Recruitment berhasil dibuka', () => {

    cy.intercept(
      'GET',
      '**/api/v2/recruitment/candidates*'
    ).as('candidateList');

    recruitmentPage.candidatesTab()
      .click();

    cy.wait('@candidateList')
      .then((interception) => {

        expect(interception.request.method)
          .to.eq('GET');

        expect(interception.response.statusCode)
          .to.eq(200);

      });

    recruitmentPage.pageTitle()
      .should('be.visible');

  });

  it('TC02 - Tab Candidates dapat diakses', () => {

    cy.intercept(
      'GET',
      '**/api/v2/recruitment/candidates*'
    ).as('candidatesRequest');

    recruitmentPage.candidatesTab()
      .should('be.visible')
      .click();

    cy.wait('@candidatesRequest')
      .its('request.method')
      .should('eq', 'GET');

  });

  it('TC03 - Tab Vacancies dapat diakses', () => {

    cy.intercept(
      'GET',
      '**/api/v2/recruitment/vacancies*'
    ).as('vacanciesRequest');

    recruitmentPage.vacanciesTab()
      .should('be.visible')
      .click();

    cy.wait('@vacanciesRequest')
      .then((interception) => {

        expect(interception.request.method)
          .to.eq('GET');

        expect(interception.response.statusCode)
          .to.eq(200);

      });

  });

  it('TC04 - Form Add Candidate berhasil dibuka', () => {

    cy.intercept(
      'GET',
      '**/recruitment/addCandidate*'
    ).as('addCandidatePage');

    recruitmentPage.addButton()
      .should('be.visible')
      .click();

    cy.wait('@addCandidatePage');

    cy.url()
      .should('include', '/recruitment/addCandidate');

    recruitmentPage.candidateNameInput()
      .should('be.visible');

    recruitmentPage.lastNameInput()
      .should('be.visible');

    recruitmentPage.emailInput()
      .should('be.visible');

  });

  it('TC05 - First Name wajib diisi', () => {

    recruitmentPage.addButton()
      .click();

    recruitmentPage.saveButton()
      .click();

    recruitmentPage.requiredMessage()
      .should('be.visible');

  });

  it('TC06 - Data Candidate dapat diisi', () => {

    recruitmentPage.addButton()
      .click();

    recruitmentPage.candidateNameInput()
      .type(recruitmentData.candidate.firstName);

    recruitmentPage.middleNameInput()
      .type(recruitmentData.candidate.middleName);

    recruitmentPage.lastNameInput()
      .type(recruitmentData.candidate.lastName);

    recruitmentPage.emailInput()
      .type(recruitmentData.candidate.email);

    recruitmentPage.contactNumberInput()
      .type(recruitmentData.candidate.contactNumber);


    recruitmentPage.candidateNameInput()
      .should(
        'have.value',
        recruitmentData.candidate.firstName
      );

    recruitmentPage.emailInput()
      .should(
        'have.value',
        recruitmentData.candidate.email
      );

  });

  it('TC07 - Tombol Cancel kembali ke halaman Candidate', () => {

    recruitmentPage.addButton()
      .click();

    recruitmentPage.cancelButton()
      .should('be.visible')
      .click();

    cy.url()
      .should('include', '/recruitment/viewCandidates');

  });

  it('TC08 - Tombol Save tersedia pada Add Candidate', () => {

    recruitmentPage.addButton()
      .click();

    recruitmentPage.saveButton()
      .should('be.visible')
      .and('not.be.disabled');

  });

});