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

// Calculate percentage of progress
const progressPercent = Math.min((elapsedTime / totalDuration) * 100, 100);
remainingProgress.style.width = `${progressPercent}%`;
progressPercentage.textContent = `${progressPercent.toFixed(2)}% completed`;

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
