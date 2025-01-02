// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyA55DAlDH8cSvw3qObgSYFzh5mBb0jQw8I",
    authDomain: "marriage-count.firebaseapp.com",
    databaseURL: "https://marriage-count-default-rtdb.firebaseio.com",
    projectId: "marriage-count",
    storageBucket: "marriage-count.appspot.com",
    messagingSenderId: "1050626778504",
    appId: "1:1050626778504:web:1a205c05734072201dc63d",
    measurementId: "G-WH68D0KR11"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  
  // Get elements
  const testimonialButton = document.getElementById('testimonial-toggle');
  const testimonialSection = document.getElementById('testimonial-section');
  const closeButton = document.getElementById('close-testimonial');
  const form = document.getElementById('testimonial-form');
  const nameInput = document.getElementById('name');
  const messageInput = document.getElementById('message');
  const list = document.getElementById('testimonial-list');
  
  // Toggle Testimonial Section Visibility
  testimonialButton.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent triggering the document click listener
    testimonialSection.classList.add('visible');
    testimonialSection.classList.remove('hidden');
  });
  
  closeButton.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent triggering the document click listener
    testimonialSection.classList.add('hidden');
    testimonialSection.classList.remove('visible');
  });
  
  // Close testimonial section on clicking outside
  document.addEventListener('click', (event) => {
    if (
      testimonialSection.classList.contains('visible') &&
      !testimonialSection.contains(event.target) &&
      event.target !== testimonialButton
    ) {
      testimonialSection.classList.add('hidden');
      testimonialSection.classList.remove('visible');
    }
  });
  
  // Handle Form Submission
  form.addEventListener('submit', (event) => {
    event.preventDefault();
  
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();
  
    if (name && message) {
      const testimonial = { name, message, timestamp: Date.now() };
  
      // Push testimonial to Firebase
      database.ref('testimonials').push(testimonial)
        .then(() => {
          nameInput.value = '';
          messageInput.value = '';
          alert('Your message has been submitted!'); // Optional confirmation
        })
        .catch((error) => {
          console.error("Error saving testimonial:", error);
          alert('Failed to submit your message. Please try again.');
        });
    } else {
      alert('Please fill in both name and message fields.');
    }
  });
  
  // Render Testimonials from Firebase
  function renderTestimonials(snapshot) {
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
  
  // Listen for database changes and render
  database.ref('testimonials').on('value', (snapshot) => {
    renderTestimonials(snapshot);
  });
  
  