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
