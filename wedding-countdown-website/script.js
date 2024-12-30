// Get references to HTML elements
const progressBar = document.getElementById('progress');
const percentageText = document.getElementById('percentage');
const progressSlider = document.getElementById('progressSlider');

// Update the progress bar whenever the slider changes
progressSlider.addEventListener('input', function() {
  // Get the value of the slider (0-100)
  const value = progressSlider.value;

  // Update the width of the progress bar
  progressBar.style.width = value + '%';

  // Update the percentage text
  percentageText.textContent = value + '%';
});
