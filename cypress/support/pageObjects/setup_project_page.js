class SetupProjectPage {

    getBlankProjectLink() {
        return cy.contains('Blank Project')
    }

    getProjectNameField() {
        return cy.get('#new_project_dialog_content_name_input')
    }

    getCreateProjectButton() {
        return cy.contains('Create project')
    }

    clickBlankProjectLink() {
        this.getBlankProjectLink().click()
        return this
    }

    enterProjectDetails(projectName) {
        this.getProjectNameField().type(projectName)
        return this
    }

    createProject() {
        this.getCreateProjectButton().click()
    }
}
export default SetupProjectPage;
