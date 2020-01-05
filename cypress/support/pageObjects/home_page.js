class HomePage {

    getHomeTitle() {
        return cy.get('[title="Home"]')
    }

    getLoginPageTitle() {
        return cy.title()
    }

    getNewProjectLink() {
        return cy.get('.AddItemSquircleRow-box')
    }

    getProjectName(projectName) {
        var projectCss = '.MultilineRowMetadataStructure-title>[title="' + projectName + '"]'
        return cy.get(projectCss)
    }

    getHeader(projectName) {
        cy.get('.Typography--truncate').should('have.text', projectName)
    }

    getSettingsMenuButton() {
        return cy.get('.TopbarPageHeaderGlobalActions-settingsMenuButton')
    }

    getLogOutLink() {
        return cy.get('.TopbarSettingsMenu-logout.Menu-menuItem > .MenuItem-label')
    }

    getListLink() {
        return cy.get(':nth-child(1) > .NavigationLink > .Tab-selectableTab--isClickable')
    }

    getDropdownForDeleteProject() {
        return cy.get('.TopbarPageHeaderStructure-titleRow > a')
    }

    getDeleteProject() {
        return cy.get('.Dropdown > div > a.ProjectDropdownMenuButton-deleteProjectButton.Menu-menuItem > span')
    }

    getDeleteConfirmation() {
        return cy.get('.DeletePotDialog-confirmText')
    }

    getTeam(teamName) {
        return cy.get('.SidebarTeamMembershipHeader-teamName').contains(teamName)
    }

    getDropdownForDeleteTeam() {
        return cy.get('.TopbarPageHeaderStructure-titleRow > a')
    }

    getEditSettings() {
        return cy.get('#edit_team_settings > span')
    }

    getAdvancedTab() {
        return cy.get('.advanced-team-tab.tab.unselected > a')
    }

    getDeleteItemLink() {
        return cy.get('.delete-link-text')
    }

    getDeleteTeamName() {
        return cy.get('.delete-team-confirmation-input')
    }

    getDeleteTeamConfirmation() {
        return cy.get('div.explanatory.text > div > span.new-button-text')
    }

    checkLoginSuccess() {
        this.getHomeTitle().should('be.visible')
        return this
    }

    clickOnTheProjectIcon(projectName) {
        this.getProjectName(projectName).click().then($links => {
            cy.get('ul > li:nth-child(1) > a > span').should('be.visible')
        })
        this.getHeader(projectName)
    }

    clickNewProjectLink() {
        this.getNewProjectLink().click()
    }

    clickSettingsMenuButton() {
        this.getSettingsMenuButton().click()
        return this
    }

    logOutFromTheApplication() {
        cy.waitForElement();
        this.getLogOutLink().click()
        return this
    }

    clickListLink() {
        this.getListLink().click()
    }

    clickToOpenDropdownForProjectDeletion() {
        this.getDropdownForDeleteProject().click()
    }

    clickOnDeleteProject() {
        this.getDeleteProject().click()
    }

    clickOnDeleteProjectConfirmation() {
        this.getDeleteConfirmation().click()
    }

    clickTeamforDeletion(teamName) {
        this.getTeam(teamName).click()
    }

    clickToOpenDropdownForTeamDeletion() {
        this.getDropdownForDeleteTeam().click()
    }

    clickOnEditSettingsInDropdown() {
        this.getEditSettings().click()
    }

    clickOnAdvancedTab() {
        this.getAdvancedTab().click()
    }

    clickOnDeleteItemLink() {
        this.getDeleteItemLink().click()
    }

    enterTeamNameToBeDeleted(teamName) {
        this.getDeleteTeamName().type(teamName)
    }

    clickOnDeleteTeamConfirmation() {
        this.getDeleteTeamConfirmation().click()
    }
}
export default HomePage;
