// 1. Scratch Card Setup
const canvas = document.getElementById('scratchCanvas');
const ctx = canvas.getContext('2d');

// Fill canvas with metallic scratch color
ctx.fillStyle = '#b8c6db';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Add text over canvas
ctx.fillStyle = '#333';
ctx.font = '16px Montserrat';
ctx.textAlign = 'center';
ctx.fillText('Scratch Here ✨', canvas.width / 2, canvas.height / 2);

let isScratching = false;

function scratch(e) {
  if (!isScratching) return;
  const rect = canvas.getBoundingClientRect();
  const clientX = e.clientX || (e.touches && e.touches[0].clientX);
  const clientY = e.clientY || (e.touches && e.touches[0].clientY);
  
  const x = clientX - rect.left;
  const y = clientY - rect.top;

  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, Math.PI * 2);
  ctx.fill();
}

canvas.addEventListener('mousedown', () => isScratching = true);
canvas.addEventListener('mouseup', () => isScratching = false);
canvas.addEventListener('mousemove', scratch);

canvas.addEventListener('touchstart', () => isScratching = true);
canvas.addEventListener('touchend', () => isScratching = false);
canvas.addEventListener('touchmove', scratch);

// 2. Countdown Timer Logic
const targetDate = new Date("Nov 05, 2026 06:07:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const diff = targetDate - now;

  if (diff > 0) {
    document.getElementById('days').innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
    document.getElementById('hours').innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    document.getElementById('minutes').innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    document.getElementById('seconds').innerText = Math.floor((diff % (1000 * 60)) / 1000);
  }
}, 1000);

// 3. Audio Toggle
function toggleAudio() {
  const music = document.getElementById('bgMusic');
  const btn = document.getElementById('musicBtn');
  
  if (music.paused) {
    music.play();
    btn.innerText = '⏸ Pause Music';
  } else {
    music.pause();
    btn.innerText = '🎵 Play Music';
  }
}