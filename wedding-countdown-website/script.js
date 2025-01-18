// Heart click functionality
const flowerHeart = document.getElementById('flower-heart');
const fullMessage = document.getElementById('full-message');

// Function to toggle the message visibility
function toggleMessage() {
    if (fullMessage.style.display === "none" || fullMessage.style.display === "") {
        fullMessage.style.display = "block";
    } else {
        fullMessage.style.display = "none";
    }
}

// Heart button click event to toggle the message
flowerHeart.addEventListener('click', (event) => {
    toggleMessage() & playRainSound();
    event.stopPropagation(); // Prevent click event from bubbling to document
});

// Document click event to close the message if clicked outside
document.addEventListener('click', (event) => {
    // Check if the click is outside the message and heart button
    const isClickInside = flowerHeart.contains(event.target) || fullMessage.contains(event.target);
    if (!isClickInside) {
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

    // Update days, hours, minutes, seconds with flip animation
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    // Trigger flip animation only when values change
    const animateFlip = (element, newValue) => {
        const oldValue = element.textContent;
        if (oldValue !== newValue) {
            // Wrapping the number inside a div to apply the animation
            const numberDiv = element.querySelector('div');
            numberDiv.textContent = newValue;
            numberDiv.classList.remove('flip');
            void numberDiv.offsetWidth;  // Trigger reflow for animation
            numberDiv.classList.add('flip');
        }
    };

    // Update the text content
    daysElement.querySelector('div').textContent = days < 10 ? '0' + days : days;
    hoursElement.querySelector('div').textContent = hours < 10 ? '0' + hours : hours;
    minutesElement.querySelector('div').textContent = minutes < 10 ? '0' + minutes : minutes;
    secondsElement.querySelector('div').textContent = seconds < 10 ? '0' + seconds : seconds;

    animateFlip(daysElement, daysElement.textContent);
    animateFlip(hoursElement, hoursElement.textContent);
    animateFlip(minutesElement, minutesElement.textContent);
    animateFlip(secondsElement, secondsElement.textContent);

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



class PointerParticle {
    constructor(spread, speed, component) {
        const { ctx, pointer, hue } = component;

        this.ctx = ctx;
        this.x = pointer.x;
        this.y = pointer.y;
        this.mx = pointer.mx * 0.1;
        this.my = pointer.my * 0.1;
        this.size = Math.random() + 1;
        this.decay = 0.01;
        this.speed = speed * 0.08;
        this.spread = spread * this.speed;
        this.spreadX = (Math.random() - 0.5) * this.spread - this.mx;
        this.spreadY = (Math.random() - 0.5) * this.spread - this.my;
        this.color = `hsl(${hue}deg 90% 60%)`;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fill();
    }

    collapse() {
        this.size -= this.decay;
    }

    trail() {
        this.x += this.spreadX * this.size;
        this.y += this.spreadY * this.size;
    }

    update() {
        this.draw();
        this.trail();
        this.collapse();
    }
}

class PointerParticles extends HTMLElement {
    static register(tag = "pointer-particles") {
        if ("customElements" in window) {
            customElements.define(tag, this);
        }
    }

    static css = `
      :host {
        display: grid;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }
    `;

    constructor() {
        super();

        this.canvas;
        this.ctx;
        this.fps = 60;
        this.msPerFrame = 1000 / this.fps;
        this.timePrevious;
        this.particles = [];
        this.pointer = {
            x: 0,
            y: 0,
            mx: 0,
            my: 0
        };
        this.hue = 0;
    }

    connectedCallback() {
        const canvas = document.createElement("canvas");
        const sheet = new CSSStyleSheet();

        this.shadowroot = this.attachShadow({ mode: "open" });

        sheet.replaceSync(PointerParticles.css);
        this.shadowroot.adoptedStyleSheets = [sheet];

        this.shadowroot.append(canvas);

        this.canvas = this.shadowroot.querySelector("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.setCanvasDimensions();
        this.setupEvents();
        this.timePrevious = performance.now();
        this.animateParticles();
    }

    createParticles(event, { count, speed, spread }) {
        this.setPointerValues(event);

        for (let i = 0; i < count; i++) {
            this.particles.push(new PointerParticle(spread, speed, this));
        }
    }

    setPointerValues(event) {
        const rect = this.canvas.getBoundingClientRect();
        this.pointer.x = event.clientX - rect.left;
        this.pointer.y = event.clientY - rect.top;
        this.pointer.mx = event.movementX;
        this.pointer.my = event.movementY;
    }


    setupEvents() {
        const parent = this.parentNode;

        parent.addEventListener("click", (event) => {
            this.createParticles(event, {
                count: 300,
                speed: Math.random() + 1,
                spread: Math.random() + 50
            });
        });

        parent.addEventListener("pointermove", (event) => {
            this.createParticles(event, {
                count: 20,
                speed: this.getPointerVelocity(event),
                spread: 1
            });
        });

        window.addEventListener("resize", () => this.setCanvasDimensions());
    }

    getPointerVelocity(event) {
        const a = event.movementX;
        const b = event.movementY;
        const c = Math.floor(Math.sqrt(a * a + b * b));

        return c;
    }

    handleParticles() {
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].update();

            if (this.particles[i].size <= 0.1) {
                this.particles.splice(i, 1);
                i--;
            }
        }
    }

    setCanvasDimensions() {
        const rect = this.parentNode.getBoundingClientRect();

        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    animateParticles() {
        requestAnimationFrame(() => this.animateParticles());

        const timeNow = performance.now();
        const timePassed = timeNow - this.timePrevious;

        if (timePassed < this.msPerFrame) return;

        const excessTime = timePassed % this.msPerFrame;

        this.timePrevious = timeNow - excessTime;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.hue = this.hue > 360 ? 0 : (this.hue += 3);

        this.handleParticles();
    }
}

PointerParticles.register();


document.addEventListener("DOMContentLoaded", () => {
    const rainSound = document.getElementById("rain-sound");
    const nasheed = document.getElementById("nasheed");

    // Attempt to autoplay the sound
    const playRainSound = () => {
        rainSound.play()
            .then(() => {
                console.log("Rain sound is playing.");
            })
            .catch((error) => {
                console.warn("Autoplay blocked. Waiting for user interaction.");
            });
    };

    const PlayNasheed = () => {
        nasheed.play()
            .then(() => {
                console.log("nasheed is playing.");
            })
            .catch((error) => {
                console.warn("Autoplay blocked. Waiting for user interaction.");
            });

    }

    // Try to autoplay on page load
    playRainSound();
    PlayNasheed();

    // Fallback: Start playing on user interaction
    document.addEventListener("click", () => {
        if (rainSound.paused) {
            rainSound.play();
        }
        if (nasheed.paused) {
            nasheed.play();
        }
    });
});
