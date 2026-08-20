import loginPage from '../../pages/LoginPage';
import recruitmentPage from '../../pages/RecruitmentPage';

describe('OrangeHRM - Final Project Recruitment POM', () => {

  beforeEach(() => {

    cy.on('uncaught:exception', () => {
      return false;
    });

    loginPage.visit();

    loginPage.login(
      'Admin',
      'admin123'
    );

    cy.url({ timeout: 20000 })
      .should('include', '/dashboard');

    recruitmentPage.openRecruitment();

    cy.url({ timeout: 20000 })
      .should('include', '/recruitment');

  });


  it('TC01 - Menu Recruitment berhasil dibuka', () => {

    recruitmentPage.pageTitle()
      .should('be.visible');

  });


  it('TC02 - Tab Candidates dapat diakses', () => {

    recruitmentPage.candidatesTab()
      .should('be.visible')
      .click();

  });


  it('TC03 - Tab Vacancies dapat diakses', () => {

    recruitmentPage.vacanciesTab()
      .should('be.visible')
      .click();

  });


  it('TC04 - Tombol Add Candidate dapat diklik', () => {

    recruitmentPage.addButton()
      .should('be.visible')
      .click();

    cy.url()
      .should('include', '/recruitment/addCandidate');

  });


  it('TC05 - First Name wajib diisi', () => {

    recruitmentPage.addButton()
      .click();

    recruitmentPage.saveButton()
      .click();

    recruitmentPage.requiredMessage()
      .should('be.visible');

  });


  it('TC06 - Candidate dapat diisi', () => {

    recruitmentPage.addButton()
      .click();

    recruitmentPage.candidateNameInput()
      .type('Iqbal');

    recruitmentPage.lastNameInput()
      .type('Hidayat');

    recruitmentPage.emailInput()
      .type('iqbaltest@example.com');

    recruitmentPage.candidateNameInput()
      .should('have.value', 'Iqbal');

  });


  it('TC07 - Middle Name dapat diisi', () => {

    recruitmentPage.addButton()
      .click();

    recruitmentPage.middleNameInput()
      .type('Nur');

    recruitmentPage.middleNameInput()
      .should('have.value', 'Nur');

  });


  it('TC08 - Contact Number dapat diisi', () => {

    recruitmentPage.addButton()
      .click();

    recruitmentPage.contactNumberInput()
      .type('081234567890');

    recruitmentPage.contactNumberInput()
      .should('have.value', '081234567890');

  });


  it('TC09 - Tombol Cancel tersedia', () => {

    recruitmentPage.addButton()
      .click();

    recruitmentPage.cancelButton()
      .should('be.visible');

  });


  it('TC10 - Tombol Cancel kembali ke halaman Candidate', () => {

    recruitmentPage.addButton()
      .click();

    recruitmentPage.cancelButton()
      .click();

    cy.url()
      .should('include', '/recruitment/viewCandidates');

  });


  it('TC11 - Tombol Save tersedia', () => {

    recruitmentPage.addButton()
      .click();

    recruitmentPage.saveButton()
      .should('be.visible');

  });


  it('TC12 - Form Add Candidate berhasil dibuka', () => {

    recruitmentPage.addButton()
      .click();

    recruitmentPage.candidateNameInput()
      .should('be.visible');

    recruitmentPage.lastNameInput()
      .should('be.visible');

    recruitmentPage.saveButton()
      .should('be.visible');

  });

});