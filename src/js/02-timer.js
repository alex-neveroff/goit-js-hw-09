import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');
const values = document.querySelectorAll('.value');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');
let timerId = null;
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure(
        `Please choose a date after ${new Date().getDate()}-${
          new Date().getMonth() + 1
        }-${new Date().getFullYear()}`
      );
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(input, options);

startBtn.addEventListener('click', ClickedStartButton);

function ClickedStartButton() {
  startBtn.disabled = true;
  timerId = setInterval(countdown, 1000);
}

function countdown() {
  let timeLeft = new Date(input.value) - new Date();
  if (timeLeft <= 0) {
    clearInterval(timerId);
    Notify.success('Time is over!');
    return;
  }
  updateTimerTable(convertMs(timeLeft));
  paintedTimer();
}

function updateTimerTable({ days, hours, minutes, seconds }) {
  timerDays.textContent = addLeadingZero(days);
  timerHours.textContent = addLeadingZero(hours);
  timerMinutes.textContent = addLeadingZero(minutes);
  timerSeconds.textContent = addLeadingZero(seconds);
}

function paintedTimer() {
  values.forEach(value => {
    value.classList.add('paint');
  });

  if (timerDays.textContent <= 0) {
    timerDays.classList.remove('paint');
  }

  if (timerHours.textContent <= 0 && timerDays.textContent <= 0) {
    timerHours.classList.remove('paint');
  }

  if (
    timerMinutes.textContent <= 0 &&
    timerHours.textContent <= 0 &&
    timerDays.textContent <= 0
  ) {
    timerMinutes.classList.remove('paint');
  }

  if (
    timerSeconds.textContent <= 0 &&
    timerMinutes.textContent <= 0 &&
    timerHours.textContent <= 0 &&
    timerDays.textContent <= 0
  ) {
    timerSeconds.classList.remove('paint');
  }
}

function addLeadingZero(number) {
  return number.toString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
