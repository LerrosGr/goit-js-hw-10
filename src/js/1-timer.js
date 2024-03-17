import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const btnStart = document.querySelector('[data-start]');
const inputCalendar = document.querySelector('#datetime-picker');
const showTime = document.querySelectorAll('.value');

let userSelectedDate;
let timeInterval;

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    timeInterval = userSelectedDate - new Date();

    if (timeInterval < 1) {
      iziToast.error({
        position: 'topRight',
        message: `Please choose a date in the future`,
      }),
        (btnStart.disabled = true);
    } else {
      btnStart.disabled = false;
    }
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

const fp = flatpickr(inputCalendar, options);

btnStart.addEventListener('click', handleTimer);
function handleTimer(event) {
  btnStart.disabled = true;
  inputCalendar.disabled = true;
  const timer = setInterval(() => {
    const timeInterval = userSelectedDate.getTime() - Date.now();

    const time = convertMs(timeInterval);
    showTime[0].textContent = time.days.toString().padStart(2, '0');
    showTime[1].textContent = time.hours.toString().padStart(2, '0');
    showTime[2].textContent = time.minutes.toString().padStart(2, '0');
    showTime[3].textContent = time.seconds.toString().padStart(2, '0');
    if (timeInterval < 1000) clearInterval(timer);
  }, 1000);
}
