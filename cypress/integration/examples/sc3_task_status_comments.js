import TaskStatusAndComments from '../../support/pageObjects/task_status_comments'

describe('Change task status and log comments', () => {
    beforeEach(function () {
        this.taskStatusAndComments = new TaskStatusAndComments()
        cy.fixture('testdata').then((data) => {
            this.testData = data
            cy.openApplication()
            cy.loginToApp(this.testData.ssaEmail, this.testData.password)
            cy.navigateToTheProject(this.testData.projectname)
        })
    })

    afterEach(function () {
        cy.logOutFromApp()
    })

    it('Addition of columns on List view and moving to board view of tasks', function () {
        this.taskStatusAndComments.clickAddSectionLink(this.testData.addColumn1)
        this.taskStatusAndComments.clickAddSectionLink(this.testData.addColumn2)
        this.taskStatusAndComments.clickBoardLink()
        this.taskStatusAndComments.addColumnsValidation(this.testData.addColumn1, this.testData.addColumn2)
        this.taskStatusAndComments.clickOntheTask(this.testData.taskToBeMoved)

        //Opening the task for assigning it to team member, adding description and logging comment
        this.taskStatusAndComments.clickTaskAssignee()
        this.taskStatusAndComments.enterAssigneeTaskName(this.testData.sseEmail)
        this.taskStatusAndComments.enterTaskDescription(this.testData.taskDescription)
        this.taskStatusAndComments.clickPostACommentBox()
        this.taskStatusAndComments.enterCommentInCommentBox(this.testData.inProgressComment)
        this.taskStatusAndComments.clickComment()
        this.taskStatusAndComments.taskDescAndCommentValidation(this.testData.taskDescription, this.testData.inProgressComment)
        this.taskStatusAndComments.clickCloseButton()

        //Dragging and dropping the task from first section to In Progress section
        this.taskStatusAndComments.dragAndDropInProgressTab(this.testData.taskNameInSection)
        this.taskStatusAndComments.dragAndDropInProgressTabValidation(this.testData.taskNameInSection)

        //Opening the task for logging comments and drag the task from In Progress section to completed section
        cy.logOutFromApp()
        cy.loginToApp(this.testData.sseEmail, this.testData.password)
        cy.navigateToTheProject(this.testData.projectname)
        this.taskStatusAndComments.clickBoardLink()
        this.taskStatusAndComments.clickOntheTask(this.testData.taskNameInSection)
        this.taskStatusAndComments.clickPostACommentBox()
        this.taskStatusAndComments.enterCommentInCommentBox(this.testData.completedComment)
        this.taskStatusAndComments.clickComment()
        this.taskStatusAndComments.clickLikeButton()
        this.taskStatusAndComments.taskCompletedCommentValidation(this.testData.completedComment)
        this.taskStatusAndComments.clickCloseButton()
        this.taskStatusAndComments.dragAndDropCompletedTab(this.testData.taskNameInSection)
        this.taskStatusAndComments.dragAndDropCompletedTabValidation(this.testData.taskNameInSection)
    })
})