// Testimonials Array (Load from Local Storage)
let testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];

// Toggle Testimonial Section Visibility
const testimonialButton = document.getElementById('testimonial-toggle');
const testimonialSection = document.getElementById('testimonial-section');
const closeButton = document.getElementById('close-testimonial');

testimonialButton.addEventListener('click', () => {
  testimonialSection.classList.add('visible');
  testimonialSection.classList.remove('hidden');
});

closeButton.addEventListener('click', () => {
  testimonialSection.classList.add('hidden');
  testimonialSection.classList.remove('visible');
});

// Select elements
const testimonialToggle = document.getElementById('testimonial-toggle');

// Function to toggle testimonial section visibility
function toggleTestimonialSection() {
  testimonialSection.classList.toggle('visible');
}

// Function to close the testimonial section







// Render the last three testimonials
// Render the last three testimonials with animations
function renderTestimonials() {
    const list = document.getElementById('testimonial-list');
    list.innerHTML = '';
  
    const recentTestimonials = testimonials.slice(-3).reverse();
    recentTestimonials.forEach((testimonial, index) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <strong>${testimonial.name}</strong>
        <p>${testimonial.message}</p>
      `;
  
      // Add a delay for the floating effect for new testimonials
      listItem.style.animationDelay = `${index * 0.2}s`;
  
      list.appendChild(listItem);
    });
  }
  
  // Handle Form Submission
  document.getElementById('testimonial-form').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();
  
    if (name && message) {
      testimonials.push({ name, message });
  
      // Save to Local Storage
      localStorage.setItem('testimonials', JSON.stringify(testimonials));
  
      document.getElementById('name').value = '';
      document.getElementById('message').value = '';
  
      // Render Testimonials with Animation
      renderTestimonials();
    }
  });


  function closeTestimonialSection() {
    if (testimonialSection.classList.contains('visible')) {
      testimonialSection.classList.remove('visible');
    }
  }
  
  // Event listener for the toggle button
  testimonialToggle.addEventListener('click', toggleTestimonialSection);
  
  // Event listener for clicks outside the testimonial section
  document.addEventListener('click', (event) => {
    if (
      !testimonialSection.contains(event.target) && // Click is not inside testimonial section
      !testimonialToggle.contains(event.target)    // Click is not on the toggle button
    ) {
      closeTestimonialSection();
    }
  });
  
  // Initial Render on Page Load
  renderTestimonials();
  


