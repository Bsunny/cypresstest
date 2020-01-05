import ProgressPage from '../../support/pageObjects/progress_page'

describe('Status update', () => {
    before(function () {
        this.progressPage = new ProgressPage()
        cy.fixture('testdata').then((data) => {
            this.testData = data
            cy.openApplication()
            cy.loginToApp(this.testData.ssaEmail, this.testData.password)
            cy.navigateToTheProject(this.testData.projectname)
            this.progressPage.clickProgressTab()
        })
    })

    after(function () {
        cy.logOutFromApp()
    })

    it('Update Project status and verify status is updated correctly', function () {
        //Update status to "Off Track" and verify status is updated    
        this.progressPage.setStatusTo('Off Track')
        this.progressPage.enterCommentsForStatusUpdate('Urgent - Project status changed to Off Track. Please look upon the action items assigned to you')
        this.progressPage.clickPostButton()
        this.progressPage.verifyTheStatusUpdatedTo('Off Track')

        // Update status to "At Risk" and verify status is updated
        this.progressPage.setStatusTo('At Risk')
        this.progressPage.enterCommentsForStatusUpdate('Attention - Project status changed to At Risk. Please look upon the action items assigned to you')
        this.progressPage.clickPostButton()
        this.progressPage.verifyTheStatusUpdatedTo('At Risk')

        // Update status to "On Track" and verify status is updated
        this.progressPage.setStatusTo('On Track')
        this.progressPage.enterCommentsForStatusUpdate('Project status changed to On Track. Keep up the good work')
        this.progressPage.clickPostButton()
        this.progressPage.verifyTheStatusUpdatedTo('On Track')
    })
})