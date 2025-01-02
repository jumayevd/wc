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
const testimonialButton = document.getElementById('testimonial-toggle'); // Button to open testimonial section
const testimonialSection = document.getElementById('testimonial-section'); // Testimonial section container
const closeButton = document.getElementById('close-testimonial'); // Button to close testimonial section
const testimonialForm = document.getElementById('testimonial-form'); // Testimonial form
const testimonialList = document.getElementById('testimonial-list'); // List to display testimonials

// Ensure elements are selected correctly
if (!testimonialButton || !testimonialSection || !closeButton || !testimonialForm || !testimonialList) {
    console.error("One or more DOM elements are missing. Please check your HTML structure.");
}

// Show Testimonial Section when "Share Your Wishes" button is clicked
testimonialButton.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent event bubbling
    testimonialSection.classList.add('visible'); // Show the testimonial section
    testimonialSection.classList.remove('hidden'); // Ensure it's visible
    console.log('Testimonial section opened');
});

// Close Testimonial Section when close button is clicked
closeButton.addEventListener('click', (event) => {
    event.stopPropagation();
    testimonialSection.classList.add('hidden'); // Hide the testimonial section
    testimonialSection.classList.remove('visible'); // Ensure it's hidden
    console.log('Testimonial section closed');
});

// Close Testimonial Section when clicking outside the section
document.addEventListener('click', (event) => {
    if (
        testimonialSection.classList.contains('visible') &&
        !testimonialSection.contains(event.target) &&
        event.target !== testimonialButton
    ) {
        testimonialSection.classList.add('hidden'); // Hide the testimonial section
        testimonialSection.classList.remove('visible'); // Ensure it's hidden
        console.log('Testimonial section closed by clicking outside');
    }
});

// Handle form submission
testimonialForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name && message) {
        const testimonial = { name, message, timestamp: Date.now() };

        // Push testimonial to Firebase
        database.ref('testimonials').push(testimonial)
            .then(() => {
                document.getElementById('name').value = ''; // Clear name field
                document.getElementById('message').value = ''; // Clear message field
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
    console.log('Rendering testimonials from Firebase');
    testimonialList.innerHTML = ''; // Clear the list before rendering new testimonials

    const testimonials = [];
    snapshot.forEach((childSnapshot) => {
        testimonials.push(childSnapshot.val()); // Push each testimonial data
    });

    // Sort testimonials by timestamp (newest first)
    testimonials.sort((a, b) => b.timestamp - a.timestamp);

    // Display the last three testimonials
    testimonials.slice(0, 3).forEach((testimonial) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${testimonial.name}</strong>
            <p>${testimonial.message}</p>
        `;
        testimonialList.appendChild(listItem); // Add each item to the list
    });
}

// Listen for changes in the database and render testimonials
database.ref('testimonials').on('value', (snapshot) => {
    renderTestimonials(snapshot); // Render testimonials when data is updated
    console.log('Snapshot received:', snapshot.val());
});




