class TeamPage {

    getTeamName() {
        return cy.get('.Typography--truncate')
    }

    getAddTeamLink() {
        return cy.get('a.SidebarTeamsList-addTeamLink')
    }

    getTeamNameField() {
        return cy.get('.textInput.textInput--large')
    }

    getMembersField() {
        return cy.get('.TokenizerInput-input')
    }

    getCreateTeamButton() {
        return cy.contains('Create Team')
    }

    getTeamMembersInTheTeam(emailAddress) {
        return cy.contains(emailAddress)
    }

    clickAddTeam() {
        this.getAddTeamLink().should('be.visible').click()
    }

    enterTeamName(teamName) {
        this.getTeamNameField().type(teamName)
        return this
    }

    enterTeamMembers(teamMembers) {
        for (var i = 0; i < teamMembers.length; i++) {
            this.getMembersField().type(teamMembers[i].email).type('{enter}')
        }
        return this
    }

    clickCreateTeamButton() {
        this.getCreateTeamButton().click()
        return this
    }

    verifyTeamName(teamName) {
        this.getTeamName().should('have.text', teamName)
    }

    verifyTeamMembers(teamMembers) {
        for (var i = 0; i < teamMembers.length; i++) {
            this.getTeamMembersInTheTeam(teamMembers[i].email).should('exist')
        }
    }
}
export default TeamPage;
