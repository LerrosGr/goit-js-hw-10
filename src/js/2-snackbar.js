import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const label = document.querySelector('label');
label.classList.add('label');

form.addEventListener('submit', event => {
  event.preventDefault();
  const elements = event.currentTarget.elements;
  const delay = Number(elements.delay.value.trim());
  const state = form.elements.state.value;
  const promise = createPromise(delay, state);
  promise
    .then(delay => {
      iziToast.success({
        backgroundColor: 'lightgreen',
        icon: false,
        progressBar: false,
        close: false,
        position: 'topRight',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      iziToast.error({
        backgroundColor: 'lightred',
        icon: false,
        progressBar: false,
        close: false,
        position: 'topRight',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
  event.currentTarget.reset();
});

function createPromise(delay, state) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
  return promise;
}
