(function () {
  'use strict';

  const btnYes = document.getElementById('btn-yes');
  const btnNo = document.getElementById('btn-no');
  const promptSection = document.getElementById('prompt-section');
  const yesSection = document.getElementById('yes-section');
  const confettiCanvas = document.getElementById('confetti');

  if (!btnYes || !promptSection || !yesSection) return;

  // ----- Fireworks (lightweight particles) -----
  const fireworksCanvas = document.getElementById('fireworks');
  if (fireworksCanvas) {
    const ctx = fireworksCanvas.getContext('2d');
    let width, height;
    const particles = [];
    const maxParticles = 80;
    let animId = 0;

    function resize() {
      width = fireworksCanvas.width = window.innerWidth;
      height = fireworksCanvas.height = window.innerHeight;
    }

    function createParticle() {
      return {
        x: Math.random() * width,
        y: height * 0.3 + Math.random() * height * 0.2,
        vx: (Math.random() - 0.5) * 4,
        vy: -8 - Math.random() * 6,
        life: 1,
        decay: 0.008 + Math.random() * 0.01,
        hue: Math.random() * 60 + 320,
        size: 1.5 + Math.random() * 1.5,
      };
    }

    function tick() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      if (particles.length < maxParticles && Math.random() < 0.15) {
        particles.push(createParticle());
      }
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15;
        p.vx *= 0.99;
        p.life -= p.decay;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = p.life;
        ctx.fillStyle = `hsl(${p.hue}, 80%, 65%)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(tick);
    }

    window.addEventListener('resize', resize);
    resize();
    tick();
  }

  // ----- Rose petals -----
  const petalsContainer = document.getElementById('petals');
  if (petalsContainer) {
    const petalCount = 12;
    const petalEmojis = ['🌸', '🌹', '🥀'];
    for (let i = 0; i < petalCount; i++) {
      const el = document.createElement('div');
      el.className = 'petal';
      el.textContent = petalEmojis[i % petalEmojis.length];
      el.style.cssText = [
        'position:absolute',
        'font-size:' + (14 + Math.random() * 12) + 'px',
        'left:' + Math.random() * 100 + '%',
        'top:' + Math.random() * 100 + '%',
        'animation-duration:' + (8 + Math.random() * 8) + 's',
        'animation-delay:' + Math.random() * 5 + 's',
        'opacity:' + (0.4 + Math.random() * 0.4),
      ].join(';');
      petalsContainer.appendChild(el);
    }
  }

  // ----- Yes: show response + celebratory effect -----
  function runCelebration() {
    if (!confettiCanvas) return;
    confettiCanvas.classList.remove('hidden');
    const ctx = confettiCanvas.getContext('2d');
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    const confettiPieces = [];
    const count = 60;
    for (let i = 0; i < count; i++) {
      confettiPieces.push({
        x: confettiCanvas.width / 2,
        y: confettiCanvas.height / 2,
        vx: (Math.random() - 0.5) * 14,
        vy: -6 - Math.random() * 10,
        hue: Math.random() * 60 + 320,
        size: 4 + Math.random() * 4,
        life: 1,
        decay: 0.015,
      });
    }
    let frame = 0;
    function draw() {
      frame++;
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      let any = false;
      confettiPieces.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.3;
        p.life -= p.decay;
        if (p.life <= 0) return;
        any = true;
        ctx.globalAlpha = p.life;
        ctx.fillStyle = `hsl(${p.hue}, 85%, 60%)`;
        ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
      });
      ctx.globalAlpha = 1;
      if (any && frame < 120) requestAnimationFrame(draw);
      else confettiCanvas.classList.add('hidden');
    }
    requestAnimationFrame(draw);
  }

  btnYes.addEventListener('click', function () {
    promptSection.classList.add('hidden');
    yesSection.classList.remove('hidden');
    runCelebration();
  });

  // No button: already unclickable via CSS (pointer-events: none)
  btnNo.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
  });
})();
