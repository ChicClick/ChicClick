const calendarDates = document.getElementById('calendar-dates');
const calendarMonth = document.getElementById('calendar-month');
let currentYear = 2024;
let currentMonth = 6; // June (months are zero-indexed in JavaScript Date)

const generateCalendar = (year, month) => {
    calendarDates.innerHTML = '';
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        const emptyDate = document.createElement('span');
        emptyDate.classList.add('calendar-date');
        calendarDates.appendChild(emptyDate);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dateElement = document.createElement('span');
        dateElement.classList.add('calendar-date');
        dateElement.textContent = day;
        dateElement.dataset.date = `${year}-${month + 1}-${day}`;
        dateElement.addEventListener('click', () => selectDate(dateElement));
        calendarDates.appendChild(dateElement);
    }
};

const selectDate = (element) => {
    const selectedDate = document.querySelector('.calendar-date.selected-date');
    if (selectedDate) {
        selectedDate.classList.remove('selected-date');
    }
    element.classList.add('selected-date');
    updateButtonState();
};

const changeMonth = (direction) => {
    currentMonth += direction;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    calendarMonth.textContent = `${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}`;
    generateCalendar(currentYear, currentMonth);
};

document.addEventListener('DOMContentLoaded', () => {
    calendarMonth.textContent = `${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}`;
    generateCalendar(currentYear, currentMonth);

    const timeButtons = document.querySelectorAll('.time-button');
    const bookNowButton = document.getElementById('book-now-button');
    const termsCheckbox = document.getElementById('terms');

    timeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedTime = document.querySelector('.time-button.selected-time');
            if (selectedTime) {
                selectedTime.classList.remove('selected-time');
            }
            button.classList.add('selected-time');
            updateButtonState();
        });
    });

    termsCheckbox.addEventListener('change', () => {
        updateButtonState();
        if (termsCheckbox.checked) {
            $('#termsModal').modal('show');
        }
    });

    function updateButtonState() {
        const selectedDate = document.querySelector('.calendar-date.selected-date');
        const selectedTime = document.querySelector('.time-button.selected-time');
        const termsChecked = termsCheckbox.checked;

        if (selectedDate && selectedTime && termsChecked) {
            bookNowButton.disabled = false;
            bookNowButton.classList.add('active');
        } else {
            bookNowButton.disabled = true;
            bookNowButton.classList.remove('active');
        }
    }

    document.getElementById('book-now-button').addEventListener('click', function(event) {
        event.preventDefault();
        $('#bookingModal').modal('show');
    });

    document.getElementById('modal-ok-button').addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    document.getElementById('previous-step-button').addEventListener('click', function() {
        window.location.href = 'step 2-manicure.html';
    });
});
