function speakHello() {
  const message = new SpeechSynthesisUtterance("こんにちは");
  message.lang = "ja-JP";
  speechSynthesis.speak(message);
}

window.onload = () => {
  speakHello();
  initCanvasBackground();
  document.getElementById("helloBtn").addEventListener("click", speakHello);
};

const colors = [
  "rgba(228, 3, 3, OPACITY)",    // 赤
  "rgba(255, 140, 0, OPACITY)",  // 橙
  "rgba(255, 237, 0, OPACITY)",  // 黄
  "rgba(0, 128, 38, OPACITY)",   // 緑
  "rgba(0, 77, 255, OPACITY)",   // 青
  "rgba(117, 7, 135, OPACITY)"   // 紫
];

function initCanvasBackground() {
  const canvas = document.getElementById('background');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function createParticle(x, y) {
    const opacity = Math.random() * 0.7 + 0.3;
    const color = colors[Math.floor(Math.random() * colors.length)].replace("OPACITY", opacity.toFixed(2));
    return {
      x,
      y,
      radius: Math.random() * 3 + 1.5,
      dx: (Math.random() - 0.5) * 0.6,
      dy: (Math.random() - 0.5) * 0.6,
      color
    };
  }

  // 粒子を多めに初期生成（200個）
  for (let i = 0; i < 200; i++) {
    particles.push(createParticle(
      Math.random() * canvas.width,
      Math.random() * canvas.height
    ));
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (
        p.x < -50 || p.x > canvas.width + 50 ||
        p.y < -50 || p.y > canvas.height + 50
      ) {
        // 画面外なら再配置して戻す（画面内に戻す）
        particles[i] = createParticle(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        );
      }
    }

    // 最大粒子数を多分800に設定
    if (particles.length > 800) {
      particles.splice(0, particles.length - 800);
    }

    requestAnimationFrame(animate);
  }

  animate();
}
