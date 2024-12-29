const weddingDate = new Date("2025-06-01T00:00:00"); // Set the wedding date here
const timerElement = document.getElementById("timer");
const progressBar = document.getElementById("progress");

function updateCountdown() {
  const now = new Date();
  const timeRemaining = weddingDate - now;

  if (timeRemaining <= 0) {
    timerElement.innerHTML = "The big day has arrived!";
    progressBar.style.width = "100%";
    return;
  }

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  timerElement.innerHTML = `${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`;

  // Update progress bar
  const totalTime = weddingDate - new Date("2024-01-01T00:00:00"); // Starting date (New Year)
  const progress = ((new Date() - new Date("2024-01-01T00:00:00")) / totalTime) * 100;
  progressBar.style.width = `${Math.min(progress, 100)}%`; // Ensure it doesn't exceed 100%
}

setInterval(updateCountdown, 1000); // Update countdown every second
