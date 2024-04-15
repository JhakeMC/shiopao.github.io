document.getElementById('chatForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const inputBox = document.getElementById('userInput');
    const message = inputBox.value.trim();
    if (message) {
        displayMessage(message, 'right');
        inputBox.value = '';
        // Simulate receiving a reply
        setTimeout(() => {
            displayMessage('Echo: ' + message, 'left');
        }, 1000);
    }
});

function displayMessage(message, side) {
    const chatBox = document.getElementById('chatbox');
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.style.textAlign = side;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}
