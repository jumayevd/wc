const weddingDate = new Date('2027-08-15T00:00:00');
const currentDate = new Date();

const updateCountdown = () => {
  const now = new Date();
  const timeRemaining = weddingDate - now;

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  document.getElementById('days').innerText = days;
  document.getElementById('hours').innerText = hours;
  document.getElementById('minutes').innerText = minutes;
  document.getElementById('seconds').innerText = seconds;
  const progress = ((currentDate - new Date('2021-01-01T00:00:00')) / (weddingDate - new Date('2021-01-01T00:00:00'))) * 100;

  // Update progress bar
  document.getElementById('remaining-progress').style.width = `${progress}%`;

  // Update progress percentage
  document.getElementById('progress-percentage').innerText = `${Math.round(progress)}% Completed`;

  // Update progress bar labels
  document.querySelectorAll('.scale-label').forEach((label, index) => {
    if (index === 0) label.innerText = '2021';
    else label.innerText = '2027';
  });
};

// Call the updateCountdown function every second to update the countdown timer
setInterval(updateCountdown, 1000);

// Show full message when the heart is clicked
function showMessage() {
  document.getElementById('full-message').style.display = 'block';
}
