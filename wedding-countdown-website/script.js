// Get elements
const testimonialButton = document.getElementById('testimonial-toggle');
const testimonialSection = document.getElementById('testimonial-section');
const closeButton = document.getElementById('close-testimonial');

// Toggle Testimonial Section Visibility
testimonialButton.addEventListener('click', () => {
  // Check if the testimonial section is currently hidden
  if (testimonialSection.classList.contains('hidden')) {
    testimonialSection.classList.remove('hidden');
    testimonialSection.classList.add('visible');
  } else {
    testimonialSection.classList.remove('visible');
    testimonialSection.classList.add('hidden');
  }
});

// Close Testimonial Section on clicking the close button
closeButton.addEventListener('click', () => {
  testimonialSection.classList.remove('visible');
  testimonialSection.classList.add('hidden');
});

// Close Testimonial Section if clicked outside the section
document.addEventListener('click', (event) => {
  if (
    testimonialSection.classList.contains('visible') &&
    !testimonialSection.contains(event.target) &&
    event.target !== testimonialButton
  ) {
    testimonialSection.classList.remove('visible');
    testimonialSection.classList.add('hidden');
  }
});

// Handle Form Submission (Save Testimonial to Firebase and Local Storage)
document.getElementById('testimonial-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const message = document.getElementById('message').value.trim();

  if (name && message) {
    // Add to local storage (for offline availability)
    const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
    testimonials.push({ name, message });
    localStorage.setItem('testimonials', JSON.stringify(testimonials));

    // Clear form fields
    document.getElementById('name').value = '';
    document.getElementById('message').value = '';

    // Optionally, you can also push to Firebase if needed
    firebase.database().ref('testimonials').push({ name, message, timestamp: Date.now() });
    
    // Update the list of testimonials (using local storage as an example)
    renderTestimonials();
  }
});

// Render Testimonials
function renderTestimonials() {
  const list = document.getElementById('testimonial-list');
  const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
  
  list.innerHTML = '';
  
  testimonials.slice(-3).reverse().forEach(testimonial => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<strong>${testimonial.name}</strong><p>${testimonial.message}</p>`;
    list.appendChild(listItem);
  });
}

// Initial Render
renderTestimonials();

