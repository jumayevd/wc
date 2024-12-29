// Function to update the countdown timer and progress bar
function updateCountdown() {
  // Set the wedding date (update this to your wedding date)
  const weddingDate = new Date("June 1, 2025 00:00:00").getTime();
  
  // Get the current time
  const now = new Date().getTime();
  
  // Calculate the remaining time in milliseconds
  const timeRemaining = weddingDate - now;

  // Calculate the days, hours, minutes, and seconds
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  // Update the countdown display
  document.getElementById("days").textContent = days < 10 ? `0${days}` : days;
  document.getElementById("hours").textContent = hours < 10 ? `0${hours}` : hours;
  document.getElementById("minutes").textContent = minutes < 10 ? `0${minutes}` : minutes;
  document.getElementById("seconds").textContent = seconds < 10 ? `0${seconds}` : seconds;

  // Calculate the progress bar width (percentage of time passed)
  const totalTime = weddingDate - new Date("January 1, 2024").getTime();
  const elapsedTime = now - new Date("January 1, 2024").getTime();
  const remainingPercentage = (elapsedTime / totalTime) * 100;

  // Update the progress bar width
  document.getElementById("remaining-progress").style.width = `${remainingPercentage}%`;
}

// Update the countdown and progress bar every second
setInterval(updateCountdown, 1000);

// Call the update function initially to display the countdown immediately
updateCountdown();
