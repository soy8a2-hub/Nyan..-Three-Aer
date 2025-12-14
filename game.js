const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const nyan = new Image();
nyan.src = "nyan.png";

const bote = new Image();
bote.src = "bote.png";

let y = 200;
let velocity = 0;
const gravity = 1.2;
const jump = -15;

let obstacles = [];
let frame = 0;
let score = 0;

let best = localStorage.getItem("bestScore") || 0;
document.getElementById("best").textContent = best;

document.addEventListener("keydown", e => {
  if (e.code === "Space") velocity = jump;
});

document.addEventListener("click", () => {
  velocity = jump;
});

function resetGame() {
  if (score > best) {
    best = score;
    localStorage.setItem("bestScore", best);
  }
  location.reload();
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  velocity += gravity;
  y += velocity;

  ctx.drawImage(nyan, 40, y, 60, 45);

  if (frame % 120 === 0) {
    let posY = Math.random() * 300;
    obstacles.push({ x: canvas.width, y: posY });
  }

  obstacles.forEach(o => {
    o.x -= 2.5;
    ctx.drawImage(bote, o.x, o.y, 60, 80);

    if (
      40 < o.x + 60 &&
      40 + 60 > o.x &&
      y < o.y + 80 &&
      y + 45 > o.y
    ) {
      resetGame();
    }

    if (o.x === 40) score++;
  });

  ctx.fillStyle = "#000";
  ctx.font = "16px Arial";
  ctx.fillText("Puntos: " + score, 10, 20);

  frame++;
  requestAnimationFrame(update);
}

update();
