import 'cypress-file-upload';
class ProjectDetailsPage {

    getPath(element) {
        var path;
        switch (element) {
            case 'iFrame': return 'body > div:nth-child(21) > iframe'
            case 'searchBox': return 'div.dropins-chooser-search-header > div > div > input'
            case 'selectFile': return 'div > li:nth-child(2) > div'
            case 'chooseButton': return 'div.dropins-chooser-footer > button'
        }
    }

    getProjectName() {
        return cy.get('.Typography--truncate')
    }

    getDescriptionField() {
        return cy.get('#TaskDescription-textEditor', { force: true })
    }

    getCloseDetailsButton() {
        return cy.get('.SingleTaskPaneToolbar-closeButton')
    }

    getResultsAfterOperation() {
        cy.get('.PotGridBodyPlaceholder').should('not.be.visible')
    }

    getAddTaskButton() {
        return cy.get('.AddTaskDropdownButton-addTaskButton')
    }

    getAssigneeFieldOnTaskPage() {
        return cy.get('.AssigneeWithNameDisplay-name')
    }

    getAssigneeFieldOnTaskDetails() {
        return cy.contains('Unassigned')
    }

    getAssigneeInputField() {
        return cy.get('.AssigneeTokenTypeahead-input')
    }

    getDueDateOnTaskPage() {
        return cy.get('.DueDate')
    }

    getDueDateFieldInTaskDetails() {
        return cy.contains('Due Date')
    }

    getDueDateInputField() {
        return cy.get('.DueDateInput-input')
    }

    getDetailsLink() {
        return cy.get('.SpreadsheetCell--withShadedBackground > .SpreadsheetTaskNameCell-detailsButtonClickArea > .SpreadsheetTaskNameCell-detailsButton')
    }

    getAttachmentButton() {
        return cy.get('.AddAttachmentsButton-button')
    }

    getSubTaskButton() {
        return cy.get('.SingleTaskPaneToolbar-subtaskButton')
    }

    getSubTaskField() {
        return cy.get('.SubtaskTaskRow-taskName>textarea')
    }

    getFileAttachmentName() {
        return cy.get('.TaskAttachments-fileName')
    }

    getSubTaskCount() {
        return cy.get('.CountWithIcon')
    }

    getAttachmentFromLocal() {
        return cy.get('#add_attachments_button_file_input_0')
    }

    getAttachmentFromLink(option) {
        return cy.contains(option)
    }

    getSearchBox() {
        return cy.get('#topbar_search_input')
    }

    getSearchResults() {
        return cy.contains('search results')
    }

    getFilter() {
        return cy.get('.FilterMenu')
    }

    getDueDateAsToday() {
        return cy.get('.DatePickerCalendarDate--today')
    }

    chooseFilter(filterCriteria) {
        switch (filterCriteria) {
            case 'Just my tasks': return cy.get('.Menu.Menu--default>a:first-of-type')
            case 'Due this week': return cy.get('#view_options_filter_DueThisWeek')
            case 'Due next week': return cy.get('#view_options_filter_DueNextWeek')
        }
    }

    filterResultsValidation(filterCriteria, expectedValue) {
        if (filterCriteria === 'Just my tasks') {
            this.getSortedList('Assignee').then($results => {
                const results = $results
                    .toArray()
                    .map($el => $el.innerText)
                expect(results).to.contain(expectedValue)
            })
        } else {
            this.getSortedList('Due Date').then($results => {
                const results = $results
                    .toArray()
                    .map($el => $el.innerText)
                expect(results.length).to.greaterThan(expectedValue)
            })
        }

    }

    chooseSortOption(sortOption) {
        switch (sortOption) {
            case 'None': return cy.get('#view_options_sort_ByPriority')
            case 'Due Date': return cy.get('#view_options_sort_ByDate')
            case 'Assignee': return cy.get('#view_options_sort_ByAssignee')
            case 'Likes': return cy.get('#view_options_sort_ByHearts')
            case 'Alphabetical': return cy.get('#view_options_sort_ByAlphabetical')
            case 'Priority': return cy.contains('Priority').parent()
        }
    }

    getClearFilterButton() {
        return cy.get('.FilterMenuContents-clearButton')
    }

    getSortAction() {
        return cy.get('.SortMenu.MenuAnchor')
    }

    getSortedList(sortOption) {
        switch (sortOption) {
            case 'Alphabetical': return cy.get('.SpreadsheetTaskName-input')
            case 'Likes': return cy.get('.SpreadsheetTaskNameCell-hearts')
            case 'Assignee': return cy.get('.AssigneeWithNameDisplay-name')
            case 'Due Date': return cy.get('.DueDate')
            case 'Priority': return cy.get('.ButtonSelect-label')
        }
    }

    verifyTheProjectCreated(projectName) {
        this.getProjectName().should('have.text', projectName)
    }

    enterTaskName(value) {
        this.getAddTaskButton().click().type(value)
        return this
    }

    enterAssignee(value) {
        this.getAssigneeFieldOnTaskDetails().click()
        this.getAssigneeInputField().type(value).type('{enter}')
        return this
    }

    enterDueDate(value) {
        this.getDueDateFieldInTaskDetails().click()
        this.getDueDateInputField().type(value).type('{enter}')
        return this
    }

    verifyAssigneeOnTaskPage(assignee, index) {
        this.getAssigneeFieldOnTaskPage().eq(index).then($result => {
            const result = $result.text()
            expect(assignee).to.equal(result)
        })

    }

    verifyDueDateOnTaskPage(assignee, index) {
        this.getDueDateOnTaskPage().eq(index).then($result => {
            const result = $result.text()
            expect(assignee).to.equal(result)
        })
    }

    selectDueDateAsToday() {
        this.getDueDateOnTaskPage().eq(0).click()
        this.getDueDateAsToday().click()
    }

    openDetails() {
        this.getDetailsLink().click()
        return this
    }

    closeDetails() {
        this.getCloseDetailsButton().click()
    }

    enterTaskDescription(description) {
        this.getDescriptionField().should('be.visible').type(description)
    }

    enterSubTask(value) {
        this.getSubTaskButton().click().type(value)
        return this
    }

    verifySubTaskCreated(subTaskName) {
        this.getSubTaskField().invoke('text').should('equal', subTaskName)
    }

    verifyFileAttached(fileName) {
        this.getFileAttachmentName().invoke('text').should('equal', fileName)
    }

    attachFileUsingLocalFileSystem(fileName, mimeTypeValue) {
        this.getAttachmentButton().click()
        this.getAttachmentFromLink('Your Computer').click()


        cy.fixture(fileName).then(fileContent => {
            this.getAttachmentFromLocal().upload({ fileContent, fileName, mimeType: mimeTypeValue });
        });
    }

    attachFileUsingDropbox(fileName) {
        this.getAttachmentButton().click()
        this.getAttachmentFromLink('Dropbox').click()
        cy.getIframeElement(this.getPath('iFrame'), this.getPath('searchBox')).type(fileName)
        cy.getIframeElement(this.getPath('iFrame'), this.getPath('selectFile')).click();
        cy.getIframeElement(this.getPath('iFrame'), this.getPath('chooseButton')).click();
    }

    search(searchText) {
        this.getSearchBox().should('be.visible').type(searchText).type('{enter}')
        this.getResultsAfterOperation()
        return this
    }

    searchResultValidation() {
        this.getSearchResults().should('exist')
        return this
    }

    clickFilterAction() {
        this.getFilter().click()
        return this
    }

    applyFilter(filterCriteria) {
        this.clickFilterAction().chooseFilter(filterCriteria).click()
        this.getResultsAfterOperation()
    }

    clearFilter() {
        this.clickFilterAction().getClearFilterButton().click()
    }

    clickSortAction() {
        this.getSortAction().click()
        return this
    }

    clickSortOption(sortOption) {
        this.clickSortAction().chooseSortOption(sortOption).click()
    }

    validateSortingIsCorrect(sortOption) {
        if (sortOption === 'Alphabetical') {
            this.getSortedList(sortOption).then($results => {
                const results = $results
                    .toArray()
                    .map($el => $el.innerHTML)
                this.isArraySorted(results, sortOption)
            })
        }
        else {
            this.getSortedList(sortOption).then($results => {
                const results = $results
                    .toArray()
                    .map($el => $el.innerText)
                this.isArraySorted(results, sortOption)
            })
        }
    }

    isArraySorted(arrayName, sortOption) {
        var test = [].concat(arrayName)
        if (sortOption === 'Likes') {
            test.sort(function (a, b) { return parseInt(b) - parseInt(a) })
        } else if (sortOption === 'Due Date') {
            test.sort(function (a, b) { return new Date(a) - new Date(b) })
        } else if (sortOption === 'Priority') {
            test = ['High', 'Medium', 'Low']
        }
        else {
            test.sort()
        }
        cy.wrap(test).should("deep.equal", arrayName);
    }
}
export default ProjectDetailsPage