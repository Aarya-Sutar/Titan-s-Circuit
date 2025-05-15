const boardDiv = document.getElementById("board");
const scoreRed = document.getElementById("scoreRed");
const scoreBlue = document.getElementById("scoreBlue");
const timerRed = document.getElementById("timerRed");
const timerBlue = document.getElementById("timerBlue");
const overallTimer = document.getElementById("overallTimer");
const turnIndicator = document.getElementById("turnIndicator");
const pauseBtn = document.getElementById("pauseBtn");
const resumeBtn = document.getElementById("resumeBtn");
const resetBtn = document.getElementById("resetBtn");

const center = { x: 220, y: 220 };
const radii = [160, 100, 50];

let nodePositions = [];
for (let ring = 0; ring < 3; ring++) {
  let r = radii[ring];
  for (let i = 0; i < 6; i++) {
    let angle = Math.PI / 6 + (i * Math.PI) / 3;
    nodePositions.push({
      x: center.x + r * Math.cos(angle),
      y: center.y + r * Math.sin(angle),
    });
  }
}

function renderBoard() {
  boardDiv.innerHTML = "";
  for (let i = 0; i < nodePositions.length; ++i) {
    const nodeDiv = document.createElement("div");
    nodeDiv.className = "node";
    nodeDiv.style.left = nodePositions[i].x - 18 + "px";
    nodeDiv.style.top = nodePositions[i].y - 18 + "px";
    boardDiv.appendChild(nodeDiv);
  }
}

let timers = { red: 60, blue: 60, overall: 300 };
let turn = "red";
let paused = false;
let interval = null;

function updateTimers() {
  timerRed.textContent = `Red Timer: ${timers.red}`;
  timerBlue.textContent = `Blue Timer: ${timers.blue}`;
  overallTimer.textContent = `Overall: ${timers.overall}`;
}

function tickTimers() {
  if (paused) return;
  timers.overall--;
  timers[turn]--;
  updateTimers();
  if (timers.overall <= 0 || timers.red <= 0 || timers.blue <= 0) {
    clearInterval(interval);
    alert("Time up!");
  }
}

pauseBtn.onclick = () => {
  paused = true;
};
resumeBtn.onclick = () => {
  paused = false;
};
resetBtn.onclick = resetGame;

function resetGame() {
  timers = { red: 60, blue: 60, overall: 300 };
  turn = "red";
  paused = false;
  updateTimers();
  renderBoard();
  clearInterval(interval);
  interval = setInterval(tickTimers, 1000);
}

resetGame();
