import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const elem = {
   input: document.querySelector('#datetime-picker'),
   startBtn: document.querySelector('button[data-start]'),
   spanDays: document.querySelector('span[data-days]'),
   spanHours: document.querySelector('span[data-hours]'),
   spanMinutes: document.querySelector('span[data-minutes]'),
   spanSeconds: document.querySelector('span[data-seconds]'),
   msToEvent: 0,
   options: {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,
      onChange(selectedDates) {
         elem.msToEvent = selectedDates[0] - elem.options.defaultDate;
         if (elem.msToEvent > 0) {
            elem.startBtn.removeAttribute("disabled");
            timer(elem.msToEvent);
         } else {
            Notify.warning('Please choose a date in the future');
            elem.startBtn.setAttribute("disabled", "");
         };
      },
   },
};

flatpickr(elem.input, elem.options);
elem.startBtn.setAttribute("disabled", "");

function timer(time) {
   convertMs(time);
   const { days, hours, minutes, seconds } = convertMs(elem.msToEvent);
   elem.spanDays.textContent = addLeadingZero(days);
   elem.spanHours.textContent = addLeadingZero(hours);
   elem.spanMinutes.textContent = addLeadingZero(minutes);
   elem.spanSeconds.textContent = addLeadingZero(seconds);
};

elem.startBtn.addEventListener("click", () => {
   timerId = setInterval(() => {
      elem.input.setAttribute("disabled", "");
      elem.startBtn.setAttribute("disabled", "");
      elem.msToEvent-=1000
      timer(elem.msToEvent)
      if (elem.msToEvent < 1000) {
         clearInterval(timerId);
         elem.input.removeAttribute("disabled", "");
         Notify.success('Congratulations. Discounts are active');
      }
  }, 1000);
});

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
};

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
};


























// First attempt

// const elem = {
//    input: document.querySelector('#datetime-picker'),
//    startBtn: document.querySelector('button[data-start]'),
//    spanDays: document.querySelector('span[data-days]'),
//    spanHours: document.querySelector('span[data-hours]'),
//    spanMinutes: document.querySelector('span[data-minutes]'),
//    spanSeconds: document.querySelector('span[data-seconds]'),
//    SelectedDateInMs: 0,
//    dateObj: {},
//    options: {
//       enableTime: true,
//       time_24hr: true,
//       defaultDate: new Date(),
//       minuteIncrement: 1,
//       onClose() {
//          timer(elem.SelectedDateInMs)
//       },
//    },
// };

// flatpickr(elem.input, elem.options);
// elem.startBtn.setAttribute("disabled", "");

// elem.input.addEventListener('change', () => {
//    const parsedSelectedDate = flatpickr.parseDate(elem.input.value, 'Y-m-d H:i');
//    const unixSelectedDate = Number(flatpickr.formatDate(parsedSelectedDate, 'U')) * 1000;
//    if (elem.options.defaultDate < unixSelectedDate) {
//       elem.startBtn.removeAttribute("disabled");
//       elem.SelectedDateInMs = unixSelectedDate - elem.options.defaultDate;
//    } else {
//       Notify.warning('Please choose a date in the future');
//       }; 
// });

// function convertMs(ms) {
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   const days = Math.floor(ms / day);
//   const hours = Math.floor((ms % day) / hour);
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);
//   elem.dateObj = { days, hours, minutes, seconds };
// };

// function addLeadingZero(value) {
//   return value.toString().padStart(2, '0');
// };

// function timer(time) {
//    convertMs(time);
//          const { days, hours, minutes, seconds } = elem.dateObj;
//          elem.spanDays.textContent = addLeadingZero(days);
//          elem.spanHours.textContent = addLeadingZero(hours);
//          elem.spanMinutes.textContent = addLeadingZero(minutes);
//          elem.spanSeconds.textContent = addLeadingZero(seconds);
// };

// elem.startBtn.addEventListener("click", () => {
//    timerId = setInterval(() => {
//       let timeInMs = elem.SelectedDateInMs;
//       elem.SelectedDateInMs-=1000
//       timer(timeInMs)
//       if (elem.SelectedDateInMs <= 0) {
//          clearInterval(timerId);
//       }
//   }, 1000);
// });