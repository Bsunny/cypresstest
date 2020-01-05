import CalenderViewPage from '../../support/pageObjects/calendar_view_page'
import 'cypress-file-upload';

describe('Drag and drop in calendar view', () => {
    beforeEach(function () {
        this.calenderView = new CalenderViewPage()
        cy.fixture('testdata').then((data) => {
            this.testData = data
            cy.openApplication()
            cy.loginToApp(this.testData.ssaEmail, this.testData.password)
            cy.navigateToTheProject(this.testData.projectname)
            this.calenderView.clickCalendarTab()
        })
    })

    afterEach(function () {
        cy.logOutFromApp()
    })

    it('Drag and drop the task to next day', function () {
        const calenderView = this.calenderView;
        const testData = this.testData;
        this.calenderView.showWeekendInCalendar();
        this.calenderView.selectMonthInCalendar(this.testData.calendarMonth);
        this.calenderView.getNextDayOfTheTask(this.testData.taskToBeMoved, nextBlockDay => {
            calenderView.moveTheTask(testData.taskToBeMoved)
            calenderView.validateTheTaskMovedToCorrectBlock(testData.taskToBeMoved, nextBlockDay)
        })
    })
})