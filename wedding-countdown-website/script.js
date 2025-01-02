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
  
  // Initial Render on Page Load
  renderTestimonials();
  

