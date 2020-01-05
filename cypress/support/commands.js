// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************


import LoginPage from './pageObjects/login_page'
import HomePage from './pageObjects/home_page'

Cypress.Commands.add('openApplication', () => {
    cy.visit(Cypress.env('appUrl'))
})

Cypress.Commands.add("navigateToTheProject", (projectName) => {
    let homePage = new HomePage()
    homePage.clickOnTheProjectIcon(projectName)
})

Cypress.Commands.add("loginToApp", (email, password) => {
    let loginPage = new LoginPage()
    let homePage = new HomePage()
    loginPage.enterEmail(email).checkEmailValue(email)
    loginPage.enterPassword(password).checkPasswordValue(password)
    loginPage.clickLogIn()
    homePage.checkLoginSuccess()
})

Cypress.Commands.add("logOutFromApp", () => {
    let loginPage = new LoginPage()
    let homePage = new HomePage()
    homePage.clickSettingsMenuButton()
    homePage.logOutFromTheApplication()
    loginPage.checkLogOutSuccess()
})

Cypress.Commands.add("getIframeElement", (selector, name) => {
    cy.waitForElement()
    cy.get(selector).then($iframe => {
        const $doc = $iframe.contents();
        return cy.wrap($doc[0].body);
    })
        .find(name)
        .first()
})

Cypress.Commands.add('waitForElement', () => {
    cy.wait(2000)
})