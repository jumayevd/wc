// Countdown Timer Logic
const targetDate = new Date("September 15, 2027 00:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const timeRemaining = targetDate - now;

  if (timeRemaining <= 0) {
    clearInterval(countdownInterval);
    document.getElementById("timer").innerHTML = "It's the day of our nikah!";
    return;
  }

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;

  const totalDays = Math.floor((targetDate - new Date("2021-01-01").getTime()) / (1000 * 60 * 60 * 24));
  const currentProgress = Math.floor((days / totalDays) * 100);
  document.getElementById("remaining-progress").style.width = `${currentProgress}%`;
  document.getElementById("progress-percentage").textContent = `${currentProgress}%`;
}

const countdownInterval = setInterval(updateCountdown, 1000);

// Function to show the full message when clicking the heart icon
function showFullMessage() {
  document.getElementById("full-message").style.display = "block";
  document.getElementById("click-to-learn-more").style.display = "none";
}
