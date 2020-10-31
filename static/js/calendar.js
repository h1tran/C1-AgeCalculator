const _MS_PER_DAY = 1000 * 60 * 60 * 24;

// Convert day / month number to array string.
const dayNames = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var d = new Date();
var presentYear = d.getFullYear();
var currentYear = d.getFullYear();
var presentMonth = d.getMonth();
var currentMonth = d.getMonth();
var presentDay = d.getUTCDate();
var tbl = document.createElement("table");
tbl.setAttribute('border', '1');
tbl.setAttribute('style', 'margin: 1.4rem 1.4rem 0 1.4rem');
tbl.setAttribute('style', 'border-collapse: collapse');
var tbody = document.createElement("tbody");

var btnJT = document.createElement("button");
btnJT.classList.add('roboto', 'button-styling');
btnJT.style.width = '100%';
btnJT.textContent = 'Jump to:';
btnJT.setAttribute('style', 'margin-top: 1.4rem');
document.getElementById("jumpTo").appendChild(btnJT);
btnJT.addEventListener("click", function () {
    clearTable();
    currentMonth = selectMonth.value;
    currentYear = selectYear.value;
    createCalendar(selectYear.value, selectMonth.value);
})

var selectMonth = document.createElement('select');
selectMonth.classList.add('margin-top');
selectMonth.setAttribute('style', 'padding: 1rem; outline-width: 0px');
for (let a = 0; a < monthNames.length; a++) {
    var option = document.createElement('option');
    option.value = a;
    option.textContent = monthNames[a];
    if (a == presentMonth) {
        option.setAttribute('selected', 'selected');
    }
    selectMonth.appendChild(option);
}
document.getElementById("jumpTo").appendChild(selectMonth);

var selectYear = document.createElement('select');
selectYear.classList.add('margin-top');
selectYear.setAttribute('style', 'padding: 1rem; outline-width: 0px');
for (let b = presentYear; b >= 1900; b--) {
    var option = document.createElement('option');
    option.value = b;
    option.textContent = b;
    selectYear.appendChild(option);
}
selectYear.value = currentYear;
document.getElementById("jumpTo").appendChild(selectYear);


function ageInDays() {
    if (!tbl.classList.contains("table-toggle")) {
        tbl.classList.add("table-toggle");
        createCalendar(currentYear, currentMonth);
    }
    document.getElementById("dropdownShow").classList.add("show");
}

function prev() {
    clearTable();
    currentMonth--;
    if (currentMonth <= 0 && currentYear <= 1900) {
        currentMonth++;
    }
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    createCalendar(currentYear, currentMonth);
}

function next() {
    clearTable();
    currentMonth++;
    if (currentMonth > presentMonth && currentYear >= presentYear) {
        currentMonth--;
    }
    else {
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
    }
    createCalendar(currentYear, currentMonth);
}

function resetAgeInDays() {
    checkShow();
    currentYear = d.getFullYear();
    currentMonth = d.getMonth();
    selectYear.value = currentYear;
    selectMonth.selectedIndex = currentMonth;
    document.getElementById("birthDate").innerHTML = "N/A";
    document.getElementById("result").innerHTML = "N/A";
}

function clearTable() {
    tbl.classList.remove("table-toggle");
    let node = document.getElementById("table");
    node.querySelectorAll('*').forEach(element => element.remove());
}

/* 
Code obtained from Niin Patel on how to generate the first and last day of the month. 

First day is generated by creating a new Date() reference with the current year and month.
This makes sense as the initial value of day is 0.
Last day is generated by calculating the number of offset days from the first day of the month.
32 days after the final month of the day will give you an offset. For example, 32 days after February will return an offset of 4 days because the value returned is March 5th.
Take that offset and subtract it from the original amount to get the number of days in the month.
*/ 
function createCalendar(y, m) {
    let firstDay = new Date(y, m).getDay();
    let daysInMonth = 32 - new Date(y, m, 32).getDate();

    var tr = document.createElement("tr");
    tr.style.height = '4rem';
    var td = document.createElement("td");
    td.setAttribute('style', 'text-align:left; font-size: 1.4rem; padding-left: 1.2rem; padding-top: 0.4rem');
    td.style.width = '5rem';
    td.setAttribute('colspan', '7');
    var text = document.createTextNode(monthNames[m] + " " + y);
    td.appendChild(text);
    tr.appendChild(td);
    tbody.appendChild(tr);
    var dayCount = 0;

    for (let j = 0; j < 7; j++) {
        tr = document.createElement("tr");
        tr.style.height = '3rem';
        for (let i = 0; i < 7; i++) {
            td = document.createElement("td");
            td.setAttribute('style', 'margin: -6rem; font-size: 1.4rem');
            td.style.width = '5rem';
            td.style.height = '3.4rem';
            var btn = document.createElement('button');
            btn.classList.add('roboto', 'button-styling', 'calendar');
            btn.style.width = '100%';
            if (j === 0) {
                btn.textContent = dayNames[i];
                btn.setAttribute('style', 'color: black; pointer-events: none; background-color: white; border: 0px');
            }
            else {
                dayCount++;
                if (dayCount <= firstDay || (dayCount - firstDay) > daysInMonth || (dayCount - firstDay) > presentDay) {
                    btn.textContent = "";
                    btn.setAttribute('style', 'pointer-events: none; background-color: white; border: 0px');
                }
                else {
                    btn.textContent = dayCount - firstDay;
                }
            }
            btn.addEventListener('click', function () {
                var day = this.textContent;
                calculateAgeInDays(day);
            })
            td.appendChild(btn);
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    
    tbl.appendChild(tbody);
    document.getElementById("table").appendChild(tbl);
}

function calculateAgeInDays(day) {

    var n_1 = new Date(currentYear, currentMonth, day)
    var n_2 = new Date;

    if (checkDate(n_1)) {
        alert('Please enter valid user entry dates.');
    }
    else { 
        let utcDate_1 = new Date(Date.UTC(n_1.getUTCFullYear(), n_1.getUTCMonth(), n_1.getUTCDate()));
        let utcDate_2 = new Date(Date.UTC(n_2.getUTCFullYear(), n_2.getUTCMonth(), n_2.getUTCDate()));

        /* Calculate the difference in the two dates using UTC Date format.
        UTC never observes DST (Daylight Savings Time), so there is no need to observe time sensitive information. */
        var difference = Math.floor(utcDate_2 - utcDate_1) / _MS_PER_DAY;
        document.getElementById("birthDate").innerHTML = monthNames[n_1.getMonth()] + " " + day + ", " + currentYear;
        document.getElementById("result").innerHTML = difference;
    }

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

function checkShow() {
    if (document.getElementById("dropdownShow").classList.contains("show")) {
        document.getElementById("dropdownShow").classList.remove("show");
    setTimeout(function() {
        clearTable()
    }, 750);
    }
}