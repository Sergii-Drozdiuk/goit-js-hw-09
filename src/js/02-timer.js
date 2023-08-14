import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
const elem = {
   input: document.querySelector('#datetime-picker'),
   startBtn: document.querySelector('button[data-start]'),
   spanDays: document.querySelector('span[data-days]'),
   spanHours: document.querySelector('span[data-hours]'),
   spanMinutes: document.querySelector('span[data-minutes]'),
   spanSeconds: document.querySelector('span[data-seconds]'),
   SelectedDateInMs: 0,
   dateObj: {},
   options: {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,
      onClose() {
         convertMs(elem.SelectedDateInMs);
         const { days, hours, minutes, seconds } = elem.dateObj;
         elem.spanDays.textContent = days;
         elem.spanHours.textContent = hours;
         elem.spanMinutes.textContent = minutes;
         elem.spanSeconds.textContent = seconds;
      },
},
};

flatpickr(elem.input, elem.options);
elem.startBtn.setAttribute("disabled", "");

elem.input.addEventListener('change', () => {
   const parsedSelectedDate = flatpickr.parseDate(elem.input.value, 'Y-m-d H:i');
   const unixSelectedDate = Number(flatpickr.formatDate(parsedSelectedDate, 'U')) * 1000;
   const unixDate = Date.now();
   if (unixDate < unixSelectedDate) {
      elem.startBtn.removeAttribute("disabled");
      elem.SelectedDateInMs = unixSelectedDate - unixDate;
   } else {
      alert("Please choose a date in the future");
      }; 
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day).toString().padStart(2, '0');
  const hours = Math.floor((ms % day) / hour).toString().padStart(2, '0');
  const minutes = Math.floor(((ms % day) % hour) / minute).toString().padStart(2, '0');
  const seconds = Math.floor((((ms % day) % hour) % minute) / second).toString().padStart(2, '0');
  elem.dateObj = { days, hours, minutes, seconds };
}