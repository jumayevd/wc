// script.js

// Set the wedding date
const weddingDate = new Date("June 1, 2025 00:00:00").getTime();

// Update the countdown every second
const countdown = setInterval(() => {
  const now = new Date().getTime();
  const timeLeft = weddingDate - now;

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  // Update the HTML
  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;

  // Stop the countdown when the date is reached
  if (timeLeft < 0) {
    clearInterval(countdown);
    document.getElementById("timer").textContent = "The big day is here!";
  }
}, 1000);

const eventDate = new Date("YYYY-MM-DD HH:mm:ss"); // Replace with your event date
const messageElement = document.getElementById("message");

function updateMessage(daysLeft) {
  if (daysLeft > 100) {
    messageElement.textContent = "So much time left! Start planning.";
  } else if (daysLeft > 50) {
    messageElement.textContent = "It’s getting closer! 🥳";
  } else if (daysLeft > 10) {
    messageElement.textContent = "Almost there! Are you ready?";
  } else if (daysLeft > 0) {
    messageElement.textContent = "The big day is just around the corner!";
  } else {
    messageElement.textContent = "Congratulations on your special day! 🎉";
  }
}

function updateCountdown() {
  const now = new Date();
  const diff = eventDate - now;
  const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
  document.getElementById("countdown").textContent = `${daysLeft} days left!`;
  updateMessage(daysLeft);
}

setInterval(updateCountdown, 1000); // Update every second


function updateTheme(daysLeft) {
  const body = document.body;
  body.className = ""; // Reset classes
  if (daysLeft <= 10) {
    body.classList.add("theme-10");
  } else if (daysLeft <= 50) {
    body.classList.add("theme-50");
  }
}
