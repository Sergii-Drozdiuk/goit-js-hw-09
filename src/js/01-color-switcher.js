const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

stopBtn.setAttribute("disabled", "")
let timerId = null;

startBtn.addEventListener("click", () => {
  timerId = setInterval(() => {
     document.body.style.backgroundColor = getRandomHexColor();
     startBtn.setAttribute("disabled", "");
     stopBtn.removeAttribute("disabled");
  }, 1000);
});

stopBtn.addEventListener("click", () => {
   clearInterval(timerId);
   stopBtn.setAttribute("disabled", "");
   startBtn.removeAttribute("disabled");
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};