class TaskStatusAndComments {

    getAddSection() {
        return cy.get('.ItemListAddSectionButton--withSpreadsheetGrid')
    }

    getBoardLink() {
        return cy.get(':nth-child(2) > .NavigationLink > .Tab-selectableTab')
    }

    getTaskAssignee() {
        return cy.get('.AssigneeToken-userNameLabel')
    }

    getTaskAssigneeName() {
        return cy.get('.textInput.textInput--large.AssigneeTokenTypeahead-input')
    }

    getPostACommentLink() {
        return cy.get('#undefined > div')
    }

    getCommentLink() {
        return cy.get('.CommentComposerEditor-toolbarRight')
    }

    getCloseButtonLink() {
        return cy.get('.CloseButton')
    }

    getDescriptionLink() {
        return cy.get('#TaskDescription-textEditor')
    }

    getInProgressColumnPath() {
        return cy.get(':nth-child(2)>div>:nth-child(3)>:nth-child(2)>div>div')
    }

    getCompletedColumnPath() {
        return cy.get(':nth-child(3) > .BoardColumn > .BoardColumnScrollableContainer > .scrollable > .BoardColumnScrollableContainer-cardsList')
    }

    getLikeButton() {
        return cy.get('[aria-label="Click to like this task"]')
    }

    enterColumnName() {
        return cy.get('.SortableList-itemContainer--row>div:nth-child(1)>div>div>div>div')
    }

    clickTaskLink() {
        this.getTaskLink().click()
    }

    clickBoardLink() {
        this.getBoardLink().click()
    }

    clickPostACommentBox() {
        this.getPostACommentLink().click()
    }

    enterCommentInCommentBox(addingTaskComments) {
        this.getPostACommentLink().type(addingTaskComments)
    }

    clickComment() {
        this.getCommentLink().click()
    }

    clickCloseButton() {
        this.getCloseButtonLink().click()
    }

    clickAddSectionLink(columnName) {
        this.getAddSection().type(columnName)
    }

    clickTaskAssignee() {
        this.getTaskAssignee().click()
    }

    enterAssigneeTaskName(AssigneeEmailAddress) {
        this.getTaskAssigneeName().type(AssigneeEmailAddress).type('{enter}')
    }

    enterTaskDescription(taskdescription) {
        this.getDescriptionLink().type(taskdescription)
    }

    getTaskNameInTodoTab(taskName) {
        return cy.contains(taskName)
    }

    clickOntheTask(taskName) {
        this.getTaskNameInTodoTab(taskName).click()
    }

    dragAndDropInProgressTab(taskName) {
        const dataTransfer = new DataTransfer()
        var taskName1 = cy.contains(taskName)
        taskName1.scrollIntoView().trigger('dragstart', { force: true, dataTransfer })
        this.getInProgressColumnPath().trigger('dragover', { force: true, dataTransfer })
        this.getInProgressColumnPath().trigger('drop', { force: true, dataTransfer })
        taskName1.trigger('dragend', { force: true })
    }

    dragAndDropCompletedTab(taskName) {
        const dataTransfer = new DataTransfer()
        var taskName1 = cy.contains(taskName)
        taskName1.scrollIntoView().trigger('dragstart', { force: true, dataTransfer })
        this.getCompletedColumnPath().trigger('dragover', { force: true, dataTransfer })
        this.getCompletedColumnPath().trigger('drop', { force: true, dataTransfer })
        taskName1.trigger('dragend', { force: true })
    }

    clickLikeButton() {
        this.getLikeButton().click()
    }

    addColumnsValidation(column1, column2) {
        cy.get('.SortableList.BoardBody-columnSortableList').contains(column1).should('exist')
        cy.get('.SortableList.BoardBody-columnSortableList').contains(column2).should('exist')
    }

    taskDescAndCommentValidation(taskDesc, taskComment) {
        cy.get('.ShadowScrollable').contains(taskDesc).should('exist')
        cy.get('.ShadowScrollable').contains(taskComment).should('exist')
    }

    dragAndDropInProgressTabValidation(taskName) {
        this.getInProgressColumnPath().contains(taskName).should('exist')
    }

    taskCompletedCommentValidation(taskCompleteComment) {
        cy.get('.ShadowScrollable').contains(taskCompleteComment).should('exist')
    }

    dragAndDropCompletedTabValidation(taskName) {
        this.getCompletedColumnPath().contains(taskName).should('exist')
    }
}
export default TaskStatusAndComments;
