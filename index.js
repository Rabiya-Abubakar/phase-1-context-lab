// Creates an employee record from an array of employee data
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Converts an array of arrays into an array of employee records
function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord);
}

// Adds a time-in event to an employee record
function createTimeInEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    });
    return this;
}

// Adds a time-out event to an employee record
function createTimeOutEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    });
    return this;
}

// Calculates hours worked on a specific date
function hoursWorkedOnDate(date) {
    const timeInEvent = this.timeInEvents.find(e => e.date === date);
    const timeOutEvent = this.timeOutEvents.find(e => e.date === date);
    
    if (!timeInEvent || !timeOutEvent) {
        throw new Error('Missing timeInEvent or timeOutEvent for the given date');
    }
    
    return (timeOutEvent.hour - timeInEvent.hour) / 100;
}

// Calculates wages earned on a specific date
function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

// Calculates total wages for an employee across all dates
function allWagesFor() {
    const eligibleDates = this.timeInEvents.map(e => e.date);
    const totalWages = eligibleDates.reduce((memo, date) => {
        return memo + wagesEarnedOnDate.call(this, date);
    }, 0);
    
    return totalWages;
}

// Finds an employee record by first name in a collection
function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
}

// Calculates total payroll for all employees
function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((memo, employee) => {
        return memo + allWagesFor.call(employee);
    }, 0);
}
