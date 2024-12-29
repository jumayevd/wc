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


function updateProgressBar() {
  const totalDuration = eventDate - new Date("2024-01-01T00:00:00"); // Start date
  const elapsed = Date.now() - new Date("2024-01-01T00:00:00");
  const percentage = Math.min((elapsed / totalDuration) * 100, 100);
  document.getElementById("progress").style.width = `${percentage}%`;
}

setInterval(updateProgressBar, 1000); // Update progress bar every second


const milestones = [100, 50, 10];
const milestonesContainer = document.getElementById("milestones");

milestones.forEach((milestone) => {
  const milestoneElement = document.createElement("p");
  milestoneElement.textContent = `${milestone} days left!`;
  milestonesContainer.appendChild(milestoneElement);
});
