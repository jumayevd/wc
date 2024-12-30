// Listen for the form submission
document.getElementById('guestBookForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form from refreshing the page

  const name = document.getElementById('name').value;
  const message = document.getElementById('message').value;

  if (name && message) {
    const newMessage = {
      name: name,
      message: message,
      timestamp: new Date().toISOString(),
    };

    // Save message to localStorage
    let messages = JSON.parse(localStorage.getItem('guestBookMessages')) || [];
    messages.push(newMessage);
    localStorage.setItem('guestBookMessages', JSON.stringify(messages));

    // Clear form fields after submitting
    document.getElementById('name').value = '';
    document.getElementById('message').value = '';

    // Display the new message immediately
    displayMessage(newMessage);
  }
});

// Load and display all messages when the page loads
window.onload = function () {
  const savedMessages = JSON.parse(localStorage.getItem('guestBookMessages')) || [];
  savedMessages.forEach(message => {
    displayMessage(message);
  });
};

// Function to display a single message
function displayMessage(message) {
  const messagesContainer = document.getElementById('messagesContainer');
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');
  messageDiv.innerHTML = `
    <strong>${message.name}</strong>
    <p>${message.message}</p>
    <small>${new Date(message.timestamp).toLocaleString()}</small>
  `;
  messagesContainer.appendChild(messageDiv);
}
