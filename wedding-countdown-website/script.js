// Countdown Timer
const countdown = () => {
  const weddingDate = new Date('2027-08-01');
  const now = new Date();
  const diff = weddingDate - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('days').textContent = days;
  document.getElementById('hours').textContent = hours;
  document.getElementById('minutes').textContent = minutes;
  document.getElementById('seconds').textContent = seconds;
};

setInterval(countdown, 1000);

// Progress Bar
const progressBar = document.querySelector('.progress-bar-container');
const remainingProgress = document.getElementById('remaining-progress');
const progressPercentage = document.getElementById('progress-percentage');

const startDate = new Date(2021, 9); // October 2021
const endDate = new Date(2027, 7); // August 2027
const currentDate = new Date();

const totalDuration = endDate - startDate;
const elapsedTime = currentDate - startDate;

const progressPercent = Math.min((elapsedTime / totalDuration) * 100, 100);
remainingProgress.style.width = `${progressPercent}%`;
progressPercentage.textContent = `${progressPercent.toFixed(2)}% completed`;
