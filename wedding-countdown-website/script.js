// Set wedding and meeting dates
const weddingDate = new Date('August 1, 2027 00:00:00'); // Wedding date (Updated)
const meetingDate = new Date('October 1, 2021 00:00:00'); // Meeting date

// Function to update the countdown
function updateCountdown() {
  const currentDate = new Date();
  
  // Calculate time difference between now and wedding date
  const timeRemaining = weddingDate - currentDate;
  
  // Calculate remaining time (in days, hours, minutes, and seconds)
  const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hoursRemaining = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const secondsRemaining = Math.floor((timeRemaining % (1000 * 60)) / 1000);
  
  // Update the countdown display
  document.getElementById('days').textContent = daysRemaining;
  document.getElementById('hours').textContent = hoursRemaining;
  document.getElementById('minutes').textContent = minutesRemaining;
  document.getElementById('seconds').textContent = secondsRemaining;

  // Calculate total time between meeting and wedding in milliseconds
  const totalTime = weddingDate - meetingDate;

  // Calculate the percentage of time passed
  const timeElapsed = currentDate - meetingDate;
  const percentage = (timeElapsed / totalTime) * 100;

  // Update progress bar based on the percentage
  document.getElementById('remaining-progress').style.width = percentage + '%';
}

// Call updateCountdown function every second to keep the countdown updated
setInterval(updateCountdown, 1000);

// Initial call to set the countdown immediately
updateCountdown();
