function sendMessage() {
    const chatBox = document.getElementById('chat-box');
    const chatInput = document.getElementById('chat-input');
    const message = chatInput.value.trim();
    if (message !== "") {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        chatBox.appendChild(messageElement);
        chatInput.value = ""; // Clear input after sending
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the latest message
    }
}
