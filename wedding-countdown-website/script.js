// Testimonials Array
let testimonials = [];

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
