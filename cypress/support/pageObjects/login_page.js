class LoginPage {

    getEmailField() {
        return cy.get('#email_input')
    }

    getEmailFieldLabel(){
        return cy.contains('Email Address')
    }

    getPasswordField() {
        return cy.get('#password_input')
    }

    getLogInButton() {
        return cy.get('#submit_button')
    }

    enterEmail(value) {
        this.getEmailField().type(value)
        return this
    }

    enterPassword(value) {
        this.getPasswordField().type(value)
        return this
    }

    clickLogIn() {
        this.getLogInButton().click()
        return this
    }

    checkEmailValue(value) {
        this.getEmailField().should('have.value', value)
        return this
    }

    checkPasswordValue(value) {
        this.getPasswordField().should('have.value', value)
        return this
    }

    checkLogOutSuccess() {
        this.getEmailFieldLabel().should('be.visible')
        return this
    }
}
export default LoginPage;
