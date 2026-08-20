class LoginPage {

    visit() {
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    }

    enterUsername(username) {
        cy.get('input[name="username"]')
            .clear()
            .type(username);
    }

    enterPassword(password) {
        cy.get('input[name="password"]')
            .clear()
            .type(password);
    }

    clickLogin() {
        cy.get('button[type="submit"]').click();
    }

    getErrorMessage() {
        return cy.get(".oxd-alert-content-text");
    }

    getUsernameRequiredMessage() {
        return cy.get('input[name="username"]')
            .parents(".oxd-input-group")
            .find(".oxd-input-group__message");
    }

    getPasswordRequiredMessage() {
        return cy.get('input[name="password"]')
            .parents(".oxd-input-group")
            .find(".oxd-input-group__message");
    }

    getDashboard() {
        return cy.get(".oxd-topbar-header-breadcrumb");
    }

    openUserMenu() {
        cy.get(".oxd-userdropdown-tab").click();
    }

    clickLogout() {
        cy.contains("Logout").click();
    }

    getForgotPasswordLink() {
        return cy.get(".orangehrm-login-forgot-header");
    }

    getUsernameField() {
        return cy.get('input[name="username"]');
    }

    getPasswordField() {
        return cy.get('input[name="password"]');
    }

}

export default LoginPage;