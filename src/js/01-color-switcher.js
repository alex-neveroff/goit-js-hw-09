const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');
stopBtn.disabled = true;
let timerId = null;

startBtn.addEventListener('click', ClickedStartButton);
stopBtn.addEventListener('click', ClickedStopButton);

function ClickedStartButton() {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  getNewColor();
}

function ClickedStopButton() {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  clearInterval(timerId);
}

function getNewColor() {
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
