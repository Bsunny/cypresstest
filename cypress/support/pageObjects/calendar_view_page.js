class CalenderViewPage {

    getTabs() {
        return cy.get('ul>li.Tab')
    }

    getCalendarTab() {
        return cy.get(':nth-child(4) > .NavigationLink > .Tab-selectableTab--isClickable')
    }

    getTaskInCalendarView(taskName) {
        return cy.contains(taskName).closest('.CalendarDay-tasks .CalendarTaskRow')
    }

    getNextBlockToDragAndDropTask(taskName) {
        return cy.contains(taskName).closest('.ProjectCalendarDay').next().children().eq(1)
    }

    getCalendarPicker() {
        return cy.get('button.CalendarMonthPicker-button')
    }

    getNextYearSelection() {
        return cy.get('.MonthPicker-nextYear')
    }

    getMonthInCalendarPicker(month) {
        switch(month){
            case 'Jan': return cy.get('.MonthPicker-month:nth-child(1)')
            break;
            case 'Feb': return cy.get('.MonthPicker-month:nth-child(2)')
            break;
            case 'Mar': return cy.get('.MonthPicker-month:nth-child(3)')
            break;
            case 'Apr': return cy.get('.MonthPicker-month:nth-child(4)')
            break;
            case 'May': return cy.get('.MonthPicker-month:nth-child(5)')
            break;
            case 'Jun': return cy.get('.MonthPicker-month:nth-child(6)')
            break;
            case 'Jul': return cy.get('.MonthPicker-month:nth-child(7)')
            break;
            case 'Aug': return cy.get('.MonthPicker-month:nth-child(8)')
            break;
            case 'Sep': return cy.get('.MonthPicker-month:nth-child(9)')
            break;
            case 'Oct': return cy.get('.MonthPicker-month:nth-child(10)')
            break;
            case 'Nov': return cy.get('.MonthPicker-month:nth-child(11)')
            break;
            case 'Dec': return cy.get('.MonthPicker-month:nth-child(12)')
            break;
        }
    }

    getShowWeekendInCalendar() {
        return cy.get('.CalendarPageToolbar-weekendButton')
    }

    getNextDayOfTask(taskName) {
        return cy.contains(taskName).closest('.ProjectCalendarDay').next().children().eq(0).children().eq(0);
    }

    getCurrentDayOfTask(taskName) {
        return cy.contains(taskName).closest('.CalendarDay-tasks').prev().children().eq(0)
    }

    clickCalendarTab() {
        this.getTabs().should('have.length', 5)
        this.getCalendarTab().click()
        return this
    }

    clickCalendarPicker() {
        this.getCalendarPicker().click()
        this.getNextYearSelection().click()
        return this
    }

    selectMonthInCalendar(month) {
        this.clickCalendarPicker().getMonthInCalendarPicker(month).click()
    }

    showWeekendInCalendar() {
        this.getShowWeekendInCalendar().click()
    }

    moveTheTask(taskName) {
        const dataTransfer = new DataTransfer();
        this.getTaskInCalendarView(taskName).scrollIntoView().trigger('dragstart', { force: true, dataTransfer });
        this.getNextBlockToDragAndDropTask(taskName).scrollIntoView().trigger('drop', { force: true, dataTransfer });
        this.getTaskInCalendarView(taskName).scrollIntoView().trigger('dragend', { force: true });
    }

    getNextDayOfTheTask(taskName, callback) {
        this.getNextDayOfTask(taskName).then($results => {
            const nextBlockDay = $results.text();
            callback(nextBlockDay);
        })
    }

    validateTheTaskMovedToCorrectBlock(taskName, blockDay) {
        this.getCurrentDayOfTask(taskName).then($result => {
            const result = $result.text();
            expect(blockDay).to.equal(result);
        })
    }
}
export default CalenderViewPage;
