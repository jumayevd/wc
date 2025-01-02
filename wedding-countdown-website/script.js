// Get elements
const testimonialButton = document.getElementById('testimonial-toggle');
const testimonialSection = document.getElementById('testimonial-section');
const closeButton = document.getElementById('close-testimonial');

// Testimonial Section Toggle Visibility
testimonialButton.addEventListener('click', () => {
  testimonialSection.classList.toggle('hidden');
  testimonialSection.classList.toggle('visible');
});

// Close Testimonial Section
closeButton.addEventListener('click', () => {
  testimonialSection.classList.remove('visible');
  testimonialSection.classList.add('hidden');
});

// Handle Form Submission (Store in localStorage and Firebase)
document.getElementById('testimonial-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const message = document.getElementById('message').value.trim();

  if (name && message) {
    // Save to localStorage
    const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
    testimonials.push({ name, message });
    localStorage.setItem('testimonials', JSON.stringify(testimonials));

    // Optionally, save to Firebase
    firebase.database().ref('testimonials').push({ name, message, timestamp: Date.now() });

    // Clear form fields
    document.getElementById('name').value = '';
    document.getElementById('message').value = '';

    // Update the testimonial list on the page
    renderTestimonials();
  }
});

// Render Testimonials from localStorage (and Firebase if needed)
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



