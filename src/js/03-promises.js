import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formDelay = document.querySelector('input[name="delay"]');
const formStep = document.querySelector('input[name="step"]');
const formAmount = document.querySelector('input[name="amount"]');
const formButton = document.querySelector('button[type="submit"]');

formButton.addEventListener('click', clickedFormButton);

function clickedFormButton(event) {
  event.preventDefault();
  let currentDelay = Number(formDelay.value);
  for (let i = 1; i <= formAmount.value; i += 1) {
    createPromise(i, currentDelay).then(onResolve).catch(onReject);
    currentDelay += Number(formStep.value);
  }
  clearForm(currentDelay);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onResolve({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onReject({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}

function clearForm(delay) {
  setTimeout(() => {
    formDelay.value = '';
    formStep.value = '';
    formAmount.value = '';
  }, delay);
}
