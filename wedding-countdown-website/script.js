const progressBar = document.querySelector(".progress-bar-container");
const remainingProgress = document.getElementById("remaining-progress");
const progressPercentage = document.getElementById("progress-percentage");

// Date Range
const startDate = new Date(2021, 9); // October 2021
const endDate = new Date(2027, 7); // August 2027
const currentDate = new Date();

// Calculate total duration and elapsed time
const totalDuration = endDate - startDate;
const elapsedTime = currentDate - startDate;

// Progress Bar Logic
const startYear = new Date('2021-01-01');
const endYear = new Date('2027-01-01');
const currentDatee = new Date();

const totalDurationn = endYear - startYear;
const elapsedTimee = currentDatee - startYear;
const percentageCompleted = Math.min((elapsedTimee / totalDurationn) * 100, 100).toFixed(2);

// Update the progress bar and percentage text
document.getElementById('remaining-progress').style.width = `${percentageCompleted}%`;
document.getElementById('progress-percentage').textContent = `${percentageCompleted}% completed`;


// Add Scale Lines and Labels
const totalMonths = Math.ceil(totalDuration / (1000 * 60 * 60 * 24 * 30));
for (let i = 0; i <= totalMonths; i++) {
  const scaleDate = new Date(startDate);
  scaleDate.setMonth(startDate.getMonth() + i);

  const scalePosition = (i / totalMonths) * 100;
  const scaleLine = document.createElement("div");
  const scaleLabel = document.createElement("div");

  scaleLine.className = "scale-line";
  scaleLine.style.left = `${scalePosition}%`;

  scaleLabel.className = "scale-label";
  scaleLabel.style.left = `${scalePosition}%`;
  scaleLabel.textContent = scaleDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });

  progressBar.appendChild(scaleLine);
  progressBar.appendChild(scaleLabel);
}
