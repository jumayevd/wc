// Get elements
const testimonialButton = document.getElementById('testimonial-toggle');
const testimonialSection = document.getElementById('testimonial-section');
const closeButton = document.getElementById('close-testimonial');
const testimonialForm = document.getElementById('testimonial-form');
const testimonialList = document.getElementById('testimonial-list');

// Toggle visibility of testimonial section
testimonialButton.addEventListener('click', () => {
  testimonialSection.classList.toggle('hidden');
  testimonialSection.classList.toggle('visible');
});

// Close Testimonial Section
closeButton.addEventListener('click', () => {
  testimonialSection.classList.remove('visible');
  testimonialSection.classList.add('hidden');
});

// Handle Form Submission (Store in localStorage)
testimonialForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const message = document.getElementById('message').value.trim();

  if (name && message) {
    // Retrieve existing testimonials from localStorage
    const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];

    // Add the new testimonial to the array
    testimonials.push({ name, message, timestamp: Date.now() });

    // Save the updated testimonials back to localStorage
    localStorage.setItem('testimonials', JSON.stringify(testimonials));

    // Clear form fields
    document.getElementById('name').value = '';
    document.getElementById('message').value = '';

    // Update the testimonial list on the page
    renderTestimonials();
  }
});

// Render Testimonials from localStorage
function renderTestimonials() {
  const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
  testimonialList.innerHTML = ''; // Clear the existing list

  // Get the last 3 testimonials, sorted by timestamp
  const recentTestimonials = testimonials.slice(-3).reverse();

  recentTestimonials.forEach(testimonial => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<strong>${testimonial.name}</strong><p>${testimonial.message}</p>`;
    testimonialList.appendChild(listItem);
  });
}

// Initial Render
renderTestimonials();
