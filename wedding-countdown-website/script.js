const weddingDate = new Date("2025-06-01T00:00:00"); // Wedding date
const startDate = new Date("2024-01-01T00:00:00"); // Starting date (New Year)
const timerElement = document.getElementById("timer");
const remainingProgressBar = document.getElementById("remaining-progress");
const completedProgressBar = document.getElementById("completed-progress");

function updateCountdown() {
  const now = new Date();
  const timeRemaining = weddingDate - now;
  const timePassed = now - startDate;

  if (timeRemaining <= 0) {
    timerElement.innerHTML = "The big day has arrived!";
    remainingProgressBar.style.width = "0%";
    completedProgressBar.style.width = "100%";
    return;
  }

  const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const daysPassed = Math.floor(timePassed / (1000 * 60 * 60 * 24));

  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  timerElement.innerHTML = `${daysRemaining} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`;

  // Update remaining progress bar (percentage of remaining days)
  const totalDays = Math.floor((weddingDate - startDate) / (1000 * 60 * 60 * 24));
  const remainingPercentage = (daysRemaining / totalDays) * 100;
  remainingProgressBar.style.width = `${remainingPercentage}%`;

  // Update completed progress bar (percentage of completed days)
  const completedPercentage = (daysPassed / totalDays) * 100;
  completedProgressBar.style.width = `${completedPercentage}%`;
}

setInterval(updateCountdown, 1000); // Update countdown every second
