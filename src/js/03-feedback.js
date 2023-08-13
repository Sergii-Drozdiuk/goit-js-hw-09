import throttle from 'lodash.throttle';

const STORAGE_KEY = "feedback-form-state";
const elem = {
   form: document.querySelector('.feedback-form'),
   email: document.querySelector('input[name="email"]'),
   message: document.querySelector('textarea[name="message"]'),
};
const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

if (savedData !== {}) {
   elem.email.value = savedData.email || "";
   elem.message.value = savedData.message || "";
};

elem.form.addEventListener('input', throttle(saveInputsValue, 500));

function saveInputsValue(evt) {
   const formData = savedData;
   formData[evt.target.name] = evt.target.value;
   localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

elem.form.addEventListener('submit', result);

function result(evt) {
   evt.preventDefault();
   if (elem.email.value === "") {
      alert("The email field must be filled!");
      return
   }
   console.log("Form data:", savedData);
   localStorage.removeItem(STORAGE_KEY);
   elem.form.reset();
   alert("Thank you for your feedback!");
};




