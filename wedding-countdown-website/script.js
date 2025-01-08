// Particle effect
const particlesContainer = document.querySelector('.particles');

function createParticle() {
  const particle = document.createElement('div');
  particle.classList.add('particle');
  
  // Random size for particles
  const size = Math.random() * 3 + 1;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  
  // Positioning particles at random locations
  const xPos = Math.random() * 100;
  const yPos = Math.random() * 100;
  particle.style.left = `${xPos}vw`;
  particle.style.top = `${yPos}vh`;
  
  // Random animation timing for variation
  const duration = Math.random() * 5 + 4; // 4 to 9 seconds
  particle.style.animationDuration = `${duration}s`;
  
  particlesContainer.appendChild(particle);

  // Remove particle after animation
  setTimeout(() => {
    particle.remove();
  }, duration * 1000);
}

// Generate particles every 150ms
setInterval(createParticle, 150);

