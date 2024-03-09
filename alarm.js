function updateClock() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    document.getElementById('clock').textContent =
        hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    checkAlarms(hours, minutes, seconds, ampm);
}

function setAlarm() {
    var hours = document.getElementById('hours').value;
    var minutes = document.getElementById('minutes').value;
    var seconds = document.getElementById('seconds').value;
    var ampm = document.getElementById('ampm').value;
    var alarm = {hours: hours, minutes: minutes, seconds: seconds, ampm: ampm};
    var alarms = JSON.parse(localStorage.getItem('alarms')) || [];
    alarms.push(alarm);
    localStorage.setItem('alarms', JSON.stringify(alarms));
    displayAlarms();
}

function displayAlarms() {
    var alarms = JSON.parse(localStorage.getItem('alarms')) || [];
    var alarmsList = document.getElementById('alarms');
    alarmsList.innerHTML = '';
    alarmsList.className="display-items";
    alarms.forEach(function(alarm, index) {
        var li = document.createElement('li');
        li.textContent = alarm.hours + ':' + alarm.minutes + ':' + alarm.seconds + ' ' + alarm.ampm;
        var button = document.createElement('button');
        button.textContent = 'Delete';
        button.className = 'delete-button';
        button.onclick = function() {
            deleteAlarm(index);
        };
        li.appendChild(button);
        alarmsList.appendChild(li);
    });
}

function deleteAlarm(index) {
    var alarms = JSON.parse(localStorage.getItem('alarms')) || [];
    alarms.splice(index, 1);
    localStorage.setItem('alarms', JSON.stringify(alarms));
    displayAlarms();
}

function checkAlarms(hours, minutes, seconds, ampm) {
    var alarms = JSON.parse(localStorage.getItem('alarms')) || [];
    alarms.forEach(function(alarm, index) {
        if (alarm.hours == hours && alarm.minutes == minutes && alarm.seconds == seconds && alarm.ampm == ampm) {
            alert('Alarm!');
            deleteAlarm(index);
        }
    });
}

setInterval(updateClock, 1000);
displayAlarms();