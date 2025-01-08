// Example function to update time
function updateCountdown(hours, minutes, seconds) {
    // Get the current time blocks
    const hourElement = document.getElementById('hours');
    const minuteElement = document.getElementById('minutes');
    const secondElement = document.getElementById('seconds');
  
    // Check if time values have changed
    if (hourElement.innerText !== hours) {
      hourElement.classList.add('water-drop'); // Add water drop effect
      setTimeout(() => hourElement.classList.remove('water-drop'), 600); // Remove after animation ends
      hourElement.classList.add('slide-in'); // Add sliding effect
      setTimeout(() => hourElement.classList.remove('slide-in'), 600); // Remove after animation ends
      hourElement.innerText = hours; // Update time
    }
  
    if (minuteElement.innerText !== minutes) {
      minuteElement.classList.add('water-drop');
      setTimeout(() => minuteElement.classList.remove('water-drop'), 600);
      minuteElement.classList.add('slide-in');
      setTimeout(() => minuteElement.classList.remove('slide-in'), 600);
      minuteElement.innerText = minutes;
    }
  
    if (secondElement.innerText !== seconds) {
      secondElement.classList.add('water-drop');
      setTimeout(() => secondElement.classList.remove('water-drop'), 600);
      secondElement.classList.add('slide-in');
      setTimeout(() => secondElement.classList.remove('slide-in'), 600);
      secondElement.innerText = seconds;
    }
  }
  
