// Store testimonials in an array
let testimonials = [];

// Function to render the last three testimonials
function renderTestimonials() {
  const list = document.getElementById('testimonial-list');
  list.innerHTML = '';

  const recentTestimonials = testimonials.slice(-3).reverse(); // Get the last 3 testimonials
  recentTestimonials.forEach((testimonial) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<strong>${testimonial.name}</strong>: ${testimonial.message}`;
    list.appendChild(listItem);
  });
}

// Handle form submission
document.getElementById('testimonial-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const message = document.getElementById('message').value.trim();

  if (name && message) {
    // Add the new testimonial to the array
    testimonials.push({ name, message });

    // Clear the form inputs
    document.getElementById('name').value = '';
    document.getElementById('message').value = '';

    // Render the testimonials
    renderTestimonials();
  }
});

