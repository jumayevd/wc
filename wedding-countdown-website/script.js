// Particle effect generator
const particlesContainer = document.querySelector('.particles');

function createParticle() {
  const particle = document.createElement('div');
  particle.classList.add('particle');

  // Randomize particle size and position
  const size = Math.random() * 3 + 2;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;

  const xPos = Math.random() * 100;
  const yPos = Math.random() * 100;
  particle.style.left = `${xPos}vw`;
  particle.style.top = `${yPos}vh`;

  // Add the particle to the container
  particlesContainer.appendChild(particle);

  // Remove the particle after its animation ends
  setTimeout(() => {
    particle.remove();
  }, 5000);
}

// Generate particles every 100ms
setInterval(createParticle, 100);

