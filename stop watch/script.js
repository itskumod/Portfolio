let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const laps = document.getElementById("laps");

function formatTime(ms) {
  let date = new Date(ms);
  let minutes = String(date.getUTCMinutes()).padStart(2, '0');
  let seconds = String(date.getUTCSeconds()).padStart(2, '0');
  let milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
  let hours = String(Math.floor(ms / 3600000)).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
  }, 10);
}

function stopTimer() {
  clearInterval(timerInterval);
}

startStopBtn.addEventListener("click", () => {
  if (!isRunning) {
    startTimer();
    startStopBtn.textContent = "Pause";
    isRunning = true;
  } else {
    stopTimer();
    startStopBtn.textContent = "Start";
    isRunning = false;
  }
});

resetBtn.addEventListener("click", () => {
  stopTimer();
  elapsedTime = 0;
  display.textContent = "00:00:00.000";
  startStopBtn.textContent = "Start";
  isRunning = false;
  laps.innerHTML = "";
});

lapBtn.addEventListener("click", () => {
  if (isRunning) {
    const lapItem = document.createElement("li");
    lapItem.textContent = formatTime(elapsedTime);
    laps.appendChild(lapItem);
  }
});
