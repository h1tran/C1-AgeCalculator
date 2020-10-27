const _MS_PER_DAY = 1000 * 60 * 60 * 24;

// Challenge 1: Calculate Age in Days

function ageInDays() {

    var n_1 = promptDate();
    var n_2 = new Date;

    if (checkDate(n_1)) {
        alert('Please enter valid user entry dates.');
    }
    else { 
        let utcDate_1 = new Date(Date.UTC(n_1[0], n_1[1], n_1[2]));
        let utcDate_2 = new Date(Date.UTC(n_2.getUTCFullYear(), n_2.getUTCMonth(), n_2.getUTCDate()));

        /* Calculate the difference in the two dates using UTC Date format.
        UTC never observes DST (Daylight Savings Time), so there is no need to observe time sensitive information. */
        var difference = Math.floor(utcDate_2 - utcDate_1) / _MS_PER_DAY;
        document.getElementById("birthDate").innerHTML = utcDate_1.toUTCString();
        document.getElementById("result").innerHTML = difference;
    }

}

function resetAgeInDays() {
    document.getElementById("birthDate").innerHTML = "N/A";
    document.getElementById("result").innerHTML = "N/A";
}

function promptDate() {
    alert('Please answer the following questions in number format.');
    var birthYear = parseInt(prompt('On what year were you born?'), 10);
    var birthMonth = parseInt(prompt('On what month were you born?') - 1, 10);
    var birthDay = parseInt(prompt('On what day were you born?'), 10);
    return [birthYear, birthMonth, birthDay];
}

function checkDate(n_1) {
    let checkFlag = false;
    loop: for (let i = 0; i < n_1.length; i++) {
        // Generic user case testing.
        if (n_1[i] <= -1 || n_1[i] === null || isNaN(n_1[i])) {
            checkFlag = true;
            break loop;
        }
        // Check if user has entered invalid month or day entries.
        else if (n_1[1] > 12 || n_1[2] > 32) {
            checkFlag = true;
            break loop;
        }
        else {
            checkFlag = false;
        }
    }
    return checkFlag;
}