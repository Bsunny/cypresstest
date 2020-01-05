class ProgressPage {

    getTabs() {
        return cy.get('ul>li.Tab')
    }

    getMoreLink() {
        return cy.get('.TabNavigationBar-list > [aria-selected="false"] > .Tab-selectableTab--isClickable')
    }

    getProgressTab() {
        return cy.get(':nth-child(1) > .MenuItem-label')
    }

    getSetStatusButton() {
        return cy.get('.ButtonSelect.ColorStatusPicker-cell')
    }

    getStatusOption(statusOption) {
        var statusOptionCss = '[title=\'' + statusOption + '\']>div'
        return cy.get(statusOptionCss)
    }

    getStatusCommentsField() {
        return cy.get('.StatusUpdateComposer-textEditor.textEditor-container>div>div>div')
    }

    getPostButton() {
        return cy.contains('Post')
    }

    getTaskStatus(statusOption) {
        return cy.get('.StatusUpdateHeaderWidget-statusBadge')
    }

    clickProgressTab() {
        this.getTabs().should('have.length', 5)
        this.getMoreLink().click()
        this.getProgressTab().click()
        return this
    }

    clickSetStatusButton() {
        this.getSetStatusButton().click()
        return this
    }

    setStatusTo(statusOption) {
        this.clickSetStatusButton().getStatusOption(statusOption).click()
    }

    enterCommentsForStatusUpdate(comments) {
        this.getStatusCommentsField().type(comments)
    }

    clickPostButton() {
        this.getPostButton().click()
    }

    verifyTheStatusUpdatedTo(statusOption) {
        this.getTaskStatus().invoke('text').should('equal', statusOption)
    }
}
export default ProgressPage;
