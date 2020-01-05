import HomePage from '../../support/pageObjects/home_page'

describe('Delete project and team', () => {
    beforeEach(function () {
        this.homePage = new HomePage()
        cy.fixture('testdata').then((data) => {
            this.testData = data
            cy.openApplication()
            cy.loginToApp(this.testData.ssaEmail, this.testData.password)
        })
    })

    afterEach(function () {
        cy.logOutFromApp()
    })

    it('Deletion of created project', function () {
        cy.navigateToTheProject(this.testData.projectname)
        this.homePage.clickToOpenDropdownForProjectDeletion()
        this.homePage.clickOnDeleteProject()
        this.homePage.clickOnDeleteProjectConfirmation()
        this.homePage.clickTeamforDeletion(this.testData.teamName)
        this.homePage.clickToOpenDropdownForTeamDeletion()
        this.homePage.clickOnEditSettingsInDropdown()
        this.homePage.clickOnAdvancedTab()
        this.homePage.clickOnDeleteItemLink()
        this.homePage.enterTeamNameToBeDeleted(this.testData.teamName)
        this.homePage.clickOnDeleteTeamConfirmation()
    })

})
