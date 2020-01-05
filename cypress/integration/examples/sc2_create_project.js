import HomePage from '../../support/pageObjects/home_page'
import SetupProjectPage from '../../support/pageObjects/setup_project_page'
import ProjectDetailsPage from '../../support/pageObjects/project_details_page'
import TaskStatusAndComments from '../../support/pageObjects/task_status_comments'

describe('Create project and tasks', () => {
    before(function () {
        this.homePage = new HomePage()
        this.projectDetails = new ProjectDetailsPage()
        this.setupProject = new SetupProjectPage()
        this.taskStatusAndComments = new TaskStatusAndComments()
        cy.fixture('testdata').then((data) => {
            this.testData = data
            cy.openApplication()
            cy.loginToApp(this.testData.ssaEmail, this.testData.password)
        })
    })

    after(function () {
        cy.logOutFromApp()
    })

    it('Verify creation of the project and task', function () {
        this.homePage.clickNewProjectLink()
        this.setupProject.clickBlankProjectLink()
        this.setupProject.enterProjectDetails(this.testData.projectname)
        this.setupProject.createProject()
        this.projectDetails.verifyTheProjectCreated(this.testData.projectname)
        //Enter the tasks and their details
        const taskDetails = this.testData.taskDetails;
        for (var counter = 0; counter < taskDetails.length; counter++) {
            this.projectDetails.enterTaskName(this.testData.taskDetails[counter].name)
            this.projectDetails.openDetails()
            this.projectDetails.enterAssignee(this.testData.taskDetails[counter].assigneeEmail)
            this.projectDetails.enterDueDate(this.testData.taskDetails[counter].duedate)
            this.taskStatusAndComments.clickOntheTask(this.testData.taskDetails[counter].name)
            this.taskStatusAndComments.clickLikeButton()
            if (counter == 0) {
                this.projectDetails.enterSubTask(this.testData.subtaskname)
                this.projectDetails.attachFileUsingLocalFileSystem(this.testData.fileNameOnLocal, this.testData.mimeTypeValue)
                this.projectDetails.verifySubTaskCreated(this.testData.subtaskname)
                this.projectDetails.verifyFileAttached(this.testData.fileNameOnLocal)
            }
            this.projectDetails.closeDetails()
            this.projectDetails.verifyAssigneeOnTaskPage(this.testData.taskDetails[counter].assigneeName, counter)
            this.projectDetails.verifyDueDateOnTaskPage(this.testData.taskDetails[counter].duedate, counter)
        }
        cy.logOutFromApp()
        cy.loginToApp(this.testData.saEmail, this.testData.password)
        cy.navigateToTheProject(this.testData.projectname)
        this.taskStatusAndComments.clickOntheTask(this.testData.taskNameInSection)
        this.projectDetails.openDetails()
        this.taskStatusAndComments.clickLikeButton()
        // //Dropbox is not connecting with asana in PSI network
        // this.projectDetails.attachFileUsingDropbox(this.testData.fileNameOnDropbox)
    })
})
