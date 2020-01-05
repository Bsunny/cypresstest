import TeamPage from '../../support/pageObjects/team_page'

describe('Team creation', () => {
    before(function () {
        this.teamPage = new TeamPage()
        cy.fixture('testdata').then((data) => {
            this.testData = data
            cy.openApplication()
            cy.loginToApp(this.testData.ssaEmail, this.testData.password)
        })
    })

    after(function () {
        cy.logOutFromApp()
    })

    it('Creates the team and verify the team created', function () {
        this.teamPage.clickAddTeam()
        this.teamPage.enterTeamName(this.testData.teamName)
        this.teamPage.enterTeamMembers(this.testData.teamMembers)
        this.teamPage.clickCreateTeamButton()
        this.teamPage.verifyTeamName(this.testData.teamName)
        this.teamPage.verifyTeamMembers(this.testData.teamMembers)
    })
})