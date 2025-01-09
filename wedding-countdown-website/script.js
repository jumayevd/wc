// Heart click functionality
const flowerHeart = document.getElementById('flower-heart');
const fullMessage = document.getElementById('full-message');

flowerHeart.addEventListener('click', () => {
    if (fullMessage.style.display === "none" || fullMessage.style.display === "") {
        fullMessage.style.display = "block";
    } else {
        fullMessage.style.display = "none";
    }
});


const targetDate = new Date('2027-08-01T00:00:00');
const startDate = new Date('2021-01-01T00:00:00');


function updateCountdown() {
    const now = new Date();
    const totalSeconds = Math.floor((targetDate - now) / 1000);
    const totalDuration = Math.floor((targetDate - startDate) / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Update days, hours, minutes, seconds with bounce animation
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    // Trigger bounce animation only when values change
    const animateBounce = (element, newValue) => {
        const oldValue = element.textContent;
        if (oldValue !== newValue) {
            element.classList.remove('bounceIn');
            void element.offsetWidth;  // Trigger reflow for animation
            element.classList.add('bounceIn');
        }
    };

    // Update the text content
    daysElement.textContent = days < 10 ? '0' + days : days;
    hoursElement.textContent = hours < 10 ? '0' + hours : hours;
    minutesElement.textContent = minutes < 10 ? '0' + minutes : minutes;
    secondsElement.textContent = seconds < 10 ? '0' + seconds : seconds;

    animateBounce(daysElement, daysElement.textContent);
    animateBounce(hoursElement, hoursElement.textContent);
    animateBounce(minutesElement, minutesElement.textContent);
    animateBounce(secondsElement, secondsElement.textContent);

    // Calculate progress and update the progress bar
    const progressPercentage = ((totalDuration - totalSeconds) / totalDuration) * 100;
    document.getElementById('remaining-progress').style.width = `${progressPercentage}%`;
    document.getElementById('progress-percentage').textContent = `${progressPercentage.toFixed(2)}% completed`;
}

setInterval(updateCountdown, 1000);

function updateProgressBar() {
    const now = new Date();
    const totalSeconds = Math.floor((targetDate - now) / 1000);
    const totalDuration = Math.floor((targetDate - startDate) / 1000);
    const elapsedSeconds = totalDuration - totalSeconds;

    const progressPercentage = (elapsedSeconds / totalDuration) * 100;
    const progressBar = document.getElementById('remaining-progress');
    const progressText = document.getElementById('progress-percentage');

    progressBar.style.width = `${progressPercentage}%`;
    progressText.textContent = `${progressPercentage.toFixed(2)}%`;
}

setInterval(updateProgressBar, 1000);





// Import Firebase libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, limit, enableIndexedDbPersistence } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA55DAlDH8cSvw3qObgSYFzh5mBb0jQw8I",
    authDomain: "marriage-count.firebaseapp.com",
    projectId: "marriage-count",
    storageBucket: "marriage-count.appspot.com",
    messagingSenderId: "1050626778504",
    appId: "1:1050626778504:web:1a205c05734072201dc63d",
    measurementId: "G-WH68D0KR11"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Enable offline data persistence
enableIndexedDbPersistence(db)
    .catch((err) => {
        if (err.code == 'failed-precondition') {
            console.log("Persistence failed");
        } else if (err.code == 'unimplemented') {
            console.log("Persistence is not available");
        }
    });


// DOM Elements
const testimonialButton = document.getElementById('testimonial-toggle');
const testimonialSection = document.getElementById('testimonial-section');
const closeButton = document.getElementById('close-testimonial');
const testimonialList = document.getElementById('testimonial-list');
const form = document.getElementById('testimonial-form');


// Firestore reference for testimonials
const testimonialsRef = collection(db, 'testimonials');

// Toggle Testimonial Form Visibility
testimonialButton.addEventListener('click', () => {
    testimonialSection.classList.add('visible');
    testimonialSection.classList.remove('hidden');
});

closeButton.addEventListener('click', () => {
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

// Render Testimonials
function renderTestimonials(testimonials) {
    testimonialList.innerHTML = '';
    testimonials.forEach((testimonial) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
      <strong>${testimonial.name}</strong>
      <p>${testimonial.message}</p>
    `;
        testimonialList.appendChild(listItem);
    });
}

// Real-Time Listener for Testimonials
const testimonialsQuery = query(
    testimonialsRef,
    orderBy('timestamp', 'desc'),
    limit(3)
);

onSnapshot(testimonialsQuery, (snapshot) => {
    const testimonials = snapshot.docs.map(doc => doc.data());
    renderTestimonials(testimonials);
});

// Form Submission Handler
document.getElementById('testimonial-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent page reload

    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name && message) {
        try {
            // Add testimonial to Firestore or Realtime Database
            await addTestimonial(name, message);

            // Clear the input fields
            document.getElementById('name').value = '';
            document.getElementById('message').value = '';

            console.log("Testimonial submitted successfully!");
            // Force the real-time listener to pick up the new data
            await waitForNewData();
        } catch (error) {
            console.error("Error submitting testimonial:", error);
        }
    } else {
        console.error("Name and message are required!");
    }
});

// Display Testimonials
function displayTestimonials(testimonials) {
    const list = document.getElementById('testimonial-list');
    list.innerHTML = ''; // Clear the list before appending

    testimonials.forEach(({ name, message }) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${name}</strong><p>${message}</p>`;
        list.appendChild(listItem);
    });
}

// Example Function to Add Testimonial
async function addTestimonial(name, message) {
    try {
        // Use Firestore or Realtime Database logic
        await addDoc(testimonialsRef, { name, message, timestamp: Date.now() });
    } catch (error) {
        console.error("Error adding testimonial:", error);
    }
}
