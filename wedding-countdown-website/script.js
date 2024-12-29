// Progress Bar Calculation
const startYear = new Date(2021, 0); // Jan 2021
const endYear = new Date(2027, 0); // Jan 2027
const today = new Date();

const totalDuration = endYear - startYear;
const elapsedTime = today - startYear;

const progressPercentage = Math.min((elapsedTime / totalDuration) * 100, 100).toFixed(2);

// Update Progress Bar
document.getElementById('progress-bar').style.width = `${progressPercentage}%`;
document.getElementById('progress-percentage').textContent = `${progressPercentage}% completed`;

// Countdown Timer Calculation
function updateCountdown() {
  const targetDate = endYear; // Update target as needed
  const now = new Date();
  const remainingTime = targetDate - now;

  if (remainingTime <= 0) {
    clearInterval(timerInterval);
    document.getElementById('inspiration').textContent = "Congratulations! The big day has arrived! 🎉";
    return;
  }

  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  document.getElementById('days').textContent = days.toString().padStart(2, '0');
  document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
  document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
  document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Milestones
const milestones = [
  { date: "2021", text: "Started the journey!" },
  { date: "2023", text: "Halfway there!" },
  { date: "2025", text: "Almost at the finish line!" },
  { date: "2027", text: "Time to celebrate!" }
];

const milestoneList = document.getElementById("milestone-list");
milestones.forEach(milestone => {
  const listItem = document.createElement("li");
  listItem.textContent = `${milestone.date}: ${milestone.text}`;
  milestoneList.appendChild(listItem);
});

// Start Countdown Timer
const timerInterval = setInterval(updateCountdown, 1000);
updateCountdown();
