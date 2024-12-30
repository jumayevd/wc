document.getElementById('guestBookForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const message = document.getElementById('message').value;

  if (name && message) {
    const newMessage = {
      name: name,
      message: message,
    };

    // Store the message in the local storage or a database
    saveMessage(newMessage);

    // Display the new message
    displayMessage(newMessage);

    // Clear the form
    document.getElementById('name').value = '';
    document.getElementById('message').value = '';
  }
});

function saveMessage(message) {
  // For now, we use localStorage. In production, use a database or serverless function.
  let messages = JSON.parse(localStorage.getItem('guestBookMessages')) || [];
  messages.push(message);
  localStorage.setItem('guestBookMessages', JSON.stringify(messages));
}

function displayMessage(message) {
  const messagesContainer = document.getElementById('messagesContainer');
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');
  messageDiv.innerHTML = `<strong>${message.name}</strong>: <p>${message.message}</p>`;
  messagesContainer.appendChild(messageDiv);
}

// Load existing messages when the page loads
window.onload = function () {
  const savedMessages = JSON.parse(localStorage.getItem('guestBookMessages')) || [];
  savedMessages.forEach(message => {
    displayMessage(message);
  });
};
