const bestTime = document.getElementById("best-time");
const startButton = document.getElementById("start-button");
const lastAttempt = document.getElementById("last-attempt");
const icon = document.getElementById("icon");
const status = document.getElementById("status");
const instruction = document.getElementById("instruction");

let state = "idle";
let timeoutId;
let startTime = 0;
let best = null;

const handleTooSoon = () => {
  startButton.style.backgroundColor = "#27272A";
  status.textContent = "Too soon!";
  icon.textContent = "↻";
  instruction.textContent = "Click to try again";

  clearTimeout(timeoutId);
  state = "idle";
};
const handleReady = () => {
  state = "ready";
  startButton.style.backgroundColor = "#D9F99D";
  icon.style.color = "black";
  status.style.color = "black";
  instruction.style.color = "black";
  status.textContent = "Click now!";
  icon.textContent = "!";
  instruction.textContent = "Go, go, go!";
  startTime = performance.now();
};
const handleOthers = () => {
  state = "waiting";

  startButton.style.backgroundColor = "#ef4444";
  status.textContent = "Wait for green";
  icon.textContent = "…";
  instruction.textContent = "Not yet. Stay ready.";

  timeoutId = setTimeout(
    () => {
      handleReady();
    },
    2000 + Math.random() * 3000,
  );
};

startButton.addEventListener("click", (event) => {
  if (state === "waiting") {
    handleTooSoon();
  } else if (state === "ready") {
    const milliseconds = Math.round(performance.now() - startTime);
    best = !best ? milliseconds : Math.min(milliseconds, best);
    startButton.style.backgroundColor = "#27272A";
    status.textContent = `${milliseconds} ms`;
    bestTime.textContent = `${best} ms`;

    lastAttempt.textContent = milliseconds;

    icon.style.color = "white";
    status.style.color = "white";
    instruction.style.color = "white";
    icon.textContent = "✓";
    instruction.textContent = "Click to try again";

    state = "idle";
  } else {
    handleOthers();
  }
});
