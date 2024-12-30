document.getElementById('guestBookForm').addEventListener('submit', function (event) {
  event.preventDefault();

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

    // Clear form after submission
    document.getElementById('name').value = '';
    document.getElementById('message').value = '';

    // Display the new message immediately
    displayMessage(newMessage);
  }
});

// Load and display all messages from localStorage
window.onload = function () {
  const savedMessages = JSON.parse(localStorage.getItem('guestBookMessages')) || [];
  savedMessages.forEach(message => {
    displayMessage(message);
  });
};

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
