// Testimonials Array
let testimonials = [];

// Toggle Testimonial Section Visibility
const testimonialButton = document.getElementById('testimonial-toggle');
const testimonialSection = document.getElementById('testimonial-section');

testimonialButton.addEventListener('click', () => {
  testimonialSection.classList.toggle('visible');
  testimonialSection.classList.toggle('hidden');
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

    document.getElementById('name').value = '';
    document.getElementById('message').value = '';

    renderTestimonials();
  }
});

