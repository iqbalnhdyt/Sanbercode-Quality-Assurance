import LoginPage from '../../pages/LoginPage';

const loginPage = new LoginPage();

describe("OrangeHRM Login", () => {

    beforeEach(() => {
        loginPage.visit();
    });

    it("TC01 - Login with valid credentials", () => {

        loginPage.enterUsername("Admin");
        loginPage.enterPassword("admin123");
        loginPage.clickLogin();

        cy.url().should("include", "/dashboard");

        loginPage.getDashboard()
            .should("be.visible");
    });

    it("TC02 - Login with invalid password", () => {

        loginPage.enterUsername("Admin");
        loginPage.enterPassword("wrongpassword");
        loginPage.clickLogin();

        loginPage.getErrorMessage()
            .should("be.visible")
            .and("contain", "Invalid credentials");
    });

    it("TC03 - Login with invalid username", () => {

        loginPage.enterUsername("WrongUser");
        loginPage.enterPassword("admin123");
        loginPage.clickLogin();

        loginPage.getErrorMessage()
            .should("be.visible")
            .and("contain", "Invalid credentials");
    });

    it("TC04 - Login with empty username and password", () => {

        loginPage.clickLogin();

        loginPage.getUsernameRequiredMessage()
            .should("be.visible")
            .and("contain", "Required");

        loginPage.getPasswordRequiredMessage()
            .should("be.visible")
            .and("contain", "Required");
    });

    it("TC05 - Logout successfully", () => {

        loginPage.enterUsername("Admin");
        loginPage.enterPassword("admin123");
        loginPage.clickLogin();

        cy.url().should("include", "/dashboard");

        loginPage.openUserMenu();
        loginPage.clickLogout();

        cy.url().should("include", "/auth/login");

        loginPage.getUsernameField()
            .should("be.visible");

        loginPage.getPasswordField()
            .should("be.visible");
    });

    it("TC06 - Login with empty username", () => {

        loginPage.enterPassword("admin123");
        loginPage.clickLogin();

        loginPage.getUsernameRequiredMessage()
            .should("be.visible")
            .and("contain", "Required");

        cy.url().should("include", "/auth/login");
    });

    it("TC07 - Login with empty password", () => {

        loginPage.enterUsername("Admin");
        loginPage.clickLogin();

        loginPage.getPasswordRequiredMessage()
            .should("be.visible")
            .and("contain", "Required");

        cy.url().should("include", "/auth/login");
    });

    it("TC08 - Login with username containing spaces", () => {

        loginPage.enterUsername(" Admin ");
        loginPage.enterPassword("admin123");
        loginPage.clickLogin();

        loginPage.getErrorMessage()
            .should("be.visible")
            .and("contain", "Invalid credentials");
    });

    it("TC09 - Verify login page elements", () => {

        loginPage.getUsernameField()
            .should("be.visible")
            .and("have.attr", "placeholder", "Username");

        loginPage.getPasswordField()
            .should("be.visible")
            .and("have.attr", "placeholder", "Password");

        cy.get('button[type="submit"]')
            .should("be.visible")
            .and("contain", "Login");

        loginPage.getForgotPasswordLink()
            .should("be.visible");
    });

    it("TC10 - Verify password field is masked", () => {

        loginPage.getPasswordField()
            .should("have.attr", "type", "password");

        loginPage.enterUsername("Admin");
        loginPage.enterPassword("admin123");

        loginPage.getPasswordField()
            .should("have.attr", "type", "password");
    });

});