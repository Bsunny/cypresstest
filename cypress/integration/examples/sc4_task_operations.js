import ProjectDetailsPage from '../../support/pageObjects/project_details_page'

describe('Search, Filter, Sort scenarios', () => {
    beforeEach(function () {
        this.projectDetails = new ProjectDetailsPage()
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

    it('Search operation validation for valid and invalid search text', function () {
        this.projectDetails.search(this.testData.searchValue)
        this.projectDetails.searchResultValidation()
        cy.go('back')
        this.projectDetails.search('nothing')
        this.projectDetails.searchResultValidation()
        cy.go('back')
    })

    it('Sort Operation validation for all types of Sort Options', function () {
        this.projectDetails.clickSortOption('Likes')
        this.projectDetails.validateSortingIsCorrect('Likes')
        this.projectDetails.clickSortOption('Alphabetical')
        this.projectDetails.validateSortingIsCorrect('Alphabetical')
        this.projectDetails.clickSortOption('Assignee')
        this.projectDetails.validateSortingIsCorrect('Assignee')
        this.projectDetails.clickSortOption('Due Date')
        this.projectDetails.validateSortingIsCorrect('Due Date')
    })

    it('Filter Operation validation for all types of Filters available', function () {
        this.projectDetails.applyFilter('Just my tasks')
        this.projectDetails.filterResultsValidation('Just my tasks', this.testData.name)
        this.projectDetails.clearFilter()
        this.projectDetails.selectDueDateAsToday()
        this.projectDetails.applyFilter('Due this week')
        this.projectDetails.filterResultsValidation('Due this week', 0)
        this.projectDetails.clearFilter()
        this.projectDetails.applyFilter('Due next week')
        this.projectDetails.filterResultsValidation('Due next week', 0)
        this.projectDetails.clearFilter()
    })
})