const resetButton = document.getElementById("reset-button");
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const state = document.getElementById("state");
const displayHours = document.getElementById("hours");
const displayMinuts = document.getElementById("minuts");
const displaySeconds = document.getElementById("seconds");

let intervalId;
let startTime = 0;
const formatTime = (startTime) => {
  const seconds = Math.floor(startTime % 60)
    .toString()
    .padStart(2, "0");
  const minuts = Math.floor((startTime % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const hours = Math.floor(startTime / 3600)
    .toString()
    .padStart(2, "0");

  displayHours.textContent = hours;
  displayMinuts.textContent = minuts;
  displaySeconds.textContent = seconds;
};
const stopTimer = () => {
  clearInterval(intervalId);
  state.textContent = "Paused";
  startButton.disabled = false;
  stopButton.disabled = true;
  startButton.textContent = "Resume";
};
const resetTimer = () => {
  startTime = 0;
  formatTime(startTime);
  clearInterval(intervalId);
  state.textContent = "Ready";
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = true;
  startButton.textContent = "Start";
};
const startTimer = () => {
  intervalId = setInterval(() => {
    startTime++;
    formatTime(startTime);
  }, 1000);
  state.textContent = "Running";
  startButton.disabled = true;
  stopButton.disabled = false;
  resetButton.disabled = false;
};

resetButton.addEventListener("click", resetTimer);
startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
