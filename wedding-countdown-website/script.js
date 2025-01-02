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

// Render the last three testimonials
function renderTestimonials() {
  const list = document.getElementById('testimonial-list');
  list.innerHTML = '';

  const recentTestimonials = testimonials.slice(-3).reverse();
  recentTestimonials.forEach((testimonial) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <strong>${testimonial.name}</strong>
      <p>${testimonial.message}</p>
    `;
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

    renderTestimonials();
  }
});

// Initial Render on Page Load
renderTestimonials();


