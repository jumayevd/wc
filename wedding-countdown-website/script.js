// Testimonials Array (Load from Local Storage)
let testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];

// Get elements
const testimonialButton = document.getElementById('testimonial-toggle');
const testimonialSection = document.getElementById('testimonial-section');
const closeButton = document.getElementById('close-testimonial');

// Toggle Testimonial Section Visibility
testimonialButton.addEventListener('click', () => {
  testimonialSection.classList.add('visible');
  testimonialSection.classList.remove('hidden');
});

// Close Testimonial Section on clicking the close button
closeButton.addEventListener('click', closeTestimonialSection);

// Close Testimonial Section on clicking outside the section
document.addEventListener('click', (event) => {
  if (
    testimonialSection.classList.contains('visible') &&
    !testimonialSection.contains(event.target) &&
    event.target !== testimonialButton
  ) {
    closeTestimonialSection();
  }
});

// Close testimonial section function
function closeTestimonialSection() {
  testimonialSection.classList.add('hidden');
  testimonialSection.classList.remove('visible');
}

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


// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyA55DAlDH8cSvw3qObgSYFzh5mBb0jQw8I",
    authDomain: "marriage-count.firebaseapp.com",
    databaseURL: "https://marriage-count-default-rtdb.firebaseio.com",
    projectId: "marriage-count",
    storageBucket: "marriage-count.firebasestorage.app",
    messagingSenderId: "1050626778504",
    appId: "1:1050626778504:web:1a205c05734072201dc63d",
    measurementId: "G-WH68D0KR11"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();

  document.getElementById('testimonial-form').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();
  
    if (name && message) {
      const testimonial = { name, message, timestamp: Date.now() };
      firebase.database().ref('testimonials').push(testimonial);
  
      document.getElementById('name').value = '';
      document.getElementById('message').value = '';
    }
  });
  
  function renderTestimonials(snapshot) {
    const list = document.getElementById('testimonial-list');
    list.innerHTML = '';
  
    const testimonials = [];
    snapshot.forEach((childSnapshot) => {
      testimonials.push(childSnapshot.val());
    });
  
    testimonials.sort((a, b) => b.timestamp - a.timestamp); // Sort by latest
    testimonials.slice(0, 3).forEach((testimonial) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <strong>${testimonial.name}</strong>
        <p>${testimonial.message}</p>
      `;
      list.appendChild(listItem);
    });
  }
  
  // Listen for database changes
  firebase.database().ref('testimonials').on('value', (snapshot) => {
    renderTestimonials(snapshot);
  });
  