const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let width, height;
const fontSize = 22;
const heart = '💙🫂';
let columns, drops;
const particles = [];

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  columns = Math.floor(width / fontSize);
  drops = Array(columns).fill(1);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

canvas.addEventListener('click', function(e) {
  const rect = canvas.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const clickY = e.clientY - rect.top;
  const count = 30;
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 3 + 1;
    particles.push({
      x: clickX,
      y: clickY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1
    });
  }
});

function draw() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#ff4d6d';
  ctx.font = fontSize + 'px monospace';
  for (let i = 0; i < drops.length; i++) {
    ctx.fillText(heart, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }

  particles.forEach((p, idx) => {
    ctx.globalAlpha = p.alpha;
    ctx.fillText(heart, p.x, p.y);
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.05;
    p.alpha -= 0.02;
    if (p.alpha <= 0) particles.splice(idx, 1);
  });

  ctx.globalAlpha = 1;
  requestAnimationFrame(draw);
}

draw();