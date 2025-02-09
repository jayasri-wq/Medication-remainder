document.addEventListener("DOMContentLoaded", () => {
  const textElement = document.getElementById("text");
  const fireworksCanvas = document.getElementById("fireworks");
  const fireworksSound = document.getElementById("fireworksSound");
  const ctx = fireworksCanvas.getContext("2d");

  // Adjust canvas size
  fireworksCanvas.width = window.innerWidth;
  fireworksCanvas.height = window.innerHeight;

  // Array to store fireworks
  const fireworks = [];
  const particles = [];

  // Fireworks function
  class Firework {
    constructor(x, y, targetY) {
      this.x = x;
      this.y = y;
      this.targetY = targetY;
      this.speed = 4;
      this.alpha = 1;
    }

    update() {
      if (this.y > this.targetY) {
        this.y -= this.speed;
      } else {
        this.explode();
        this.alpha = 0;
      }
    }

    explode() {
      for (let i = 0; i < 50; i++) {
        particles.push(new Particle(this.x, this.y));
      }
    }

    draw() {
      if (this.alpha > 0) {
        ctx.fillStyle = `rgba(255, 100, 50, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.speedX = Math.random() * 4 - 2;
      this.speedY = Math.random() * 4 - 2;
      this.alpha = 1;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.alpha -= 0.02;
    }

    draw() {
      if (this.alpha > 0) {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
    fireworks.forEach((firework, index) => {
      firework.update();
      firework.draw();
      if (firework.alpha === 0) fireworks.splice(index, 1);
    });
    particles.forEach((particle, index) => {
      particle.update();
      particle.draw();
      if (particle.alpha <= 0) particles.splice(index, 1);
    });
    requestAnimationFrame(animate);
  }

  // Generate fireworks
  function launchFireworks() {
    fireworks.push(new Firework(Math.random() * window.innerWidth, window.innerHeight, Math.random() * window.innerHeight / 2));
  }

  // Start animation and sound
  setInterval(launchFireworks, 500);
  fireworksSound.play();

  // Sequence of text changes
  setTimeout(() => {
    textElement.textContent = "Happy New Year!";
    textElement.style.fontSize = "6rem";
    textElement.style.textShadow = "0 0 50px #00ff00, 0 0 70px #00ff99, 0 0 90px #00ffff";
  }, 4000);

  setTimeout(() => {
    textElement.textContent = "2025";
    textElement.style.fontSize = "8rem";
    textElement.style.textShadow = "0 0 50px #ff4500, 0 0 70px #ff6347, 0 0 90px #ff1493";
  }, 8000);

  // Start the animation loop
  animate();
});
