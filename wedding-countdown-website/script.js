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

// DOM Elements
const testimonialButton = document.getElementById('testimonial-toggle');
const testimonialSection = document.getElementById('testimonial-section');
const closeButton = document.getElementById('close-testimonial');
const testimonialForm = document.getElementById('testimonial-form');
const testimonialList = document.getElementById('testimonial-list');

// Toggle visibility of the testimonial section
testimonialButton.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent event bubbling
    console.log('Testimonial section opened');
    testimonialSection.classList.add('visible');
    testimonialSection.classList.remove('hidden');
});

// Close the testimonial section
closeButton.addEventListener('click', (event) => {
    event.stopPropagation();
    console.log('Testimonial section closed');
    testimonialSection.classList.add('hidden');
    testimonialSection.classList.remove('visible');
});

// Close when clicking outside the section
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

// Handle form submission
testimonialForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form default submission behavior

    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name && message) {
        const testimonial = { name, message, timestamp: Date.now() };
        // Push testimonial to Firebase
        database.ref('testimonials').push(testimonial)
            .then(() => {
                // Clear input fields after submission
                document.getElementById('name').value = '';
                document.getElementById('message').value = '';
                alert('Your testimonial has been submitted!');
                console.log('Testimonial submitted:', testimonial);
            })
            .catch((error) => {
                console.error('Error submitting testimonial:', error);
                alert('There was an error submitting your testimonial. Please try again.');
            });
    } else {
        alert('Please fill out both the name and message fields.');
    }
});

// Render testimonials from Firebase
function renderTestimonials(snapshot) {
    console.log('Rendering testimonials');
    testimonialList.innerHTML = ''; // Clear the list

    const testimonials = [];
    snapshot.forEach((childSnapshot) => {
        testimonials.push(childSnapshot.val());
    });

    // Sort by the latest timestamp
    testimonials.sort((a, b) => b.timestamp - a.timestamp);

    // Display up to the last three testimonials
    testimonials.slice(0, 3).forEach((testimonial) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${testimonial.name}</strong>
            <p>${testimonial.message}</p>
        `;
        testimonialList.appendChild(listItem);
    });
}

// Listen for changes in the database and render testimonials
database.ref('testimonials').on('value', (snapshot) => {
    renderTestimonials(snapshot);
    console.log('Snapshot received:', snapshot.val());
});



