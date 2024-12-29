// Function to update the countdown timer
function updateCountdown() {
  // Wedding Date: Set the wedding date here (can be easily modified)
  const weddingDate = new Date("June 1, 2025 00:00:00").getTime();

  // Current Date
  const now = new Date().getTime();

  // Time Remaining
  const timeRemaining = weddingDate - now;

  // Calculating days, hours, minutes, and seconds
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  // Updating the countdown elements on the page
  document.getElementById("days").textContent = days < 10 ? `0${days}` : days;
  document.getElementById("hours").textContent = hours < 10 ? `0${hours}` : hours;
  document.getElementById("minutes").textContent = minutes < 10 ? `0${minutes}` : minutes;
  document.getElementById("seconds").textContent = seconds < 10 ? `0${seconds}` : seconds;

  // Calculating progress bars (remaining and completed time)
  const totalTime = weddingDate - new Date("January 1, 2024").getTime();
  const elapsedTime = now - new Date("January 1, 2024").getTime();
  const remainingPercentage = (elapsedTime / totalTime) * 100;
  const completedPercentage = 100 - remainingPercentage;

  // Update progress bars
  document.getElementById("remaining-progress").style.width = `${remainingPercentage}%`;
  document.getElementById("completed-progress").style.width = `${completedPercentage}%`;
}

// Updating the countdown every second
setInterval(updateCountdown, 1000);

// Initialize the countdown on page load
updateCountdown();
