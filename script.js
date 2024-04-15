// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBm7Xzs4JfGjhiPbByLQ-F1g-3rZ3-rWm4",
    authDomain: "shiopao-chats.firebaseapp.com",
    databaseURL: "https://shiopao-chats-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "shiopao-chats",
    storageBucket: "shiopao-chats.appspot.com",
    messagingSenderId: "566629963156",
    appId: "1:566629963156:web:5df926120f834e83662b81"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

let username;
let password = "altf4"; // Change this to your desired password

function checkPassword() {
    const enteredPassword = document.getElementById("password").value;
    if (enteredPassword === password) {
        document.getElementById("login-container").style.display = "none";
        document.getElementById("username-container").style.display = "block";
    } else {
        alert("Incorrect password. Please try again.");
    }
}

function setUsername() {
    username = document.getElementById("username").value;
    document.getElementById("username-container").style.display = "none";
    document.getElementById("chat-container").style.display = "block";
    loadMessages();
}

function sendMessage() {
    const message = document.getElementById("message").value;
    const file = document.getElementById("file").files[0];
    const timestamp = new Date().getTime();
    const messageData = {
        username: username,
        message: message,
        timestamp: timestamp
    };
    if (file) {
        const storageRef = firebase.storage().ref('files/' + file.name);
        storageRef.put(file).then(function(snapshot) {
            snapshot.ref.getDownloadURL().then(function(url) {
                messageData.file = url;
                database.ref('messages/' + timestamp).set(messageData);
            });
        });
    } else {
        database.ref('messages/' + timestamp).set(messageData);
    }
    document.getElementById("message").value = "";
}

function loadMessages() {
    const messagesRef = database.ref('messages');
    messagesRef.on('child_added', function(snapshot) {
        const message = snapshot.val();
        const messageElement = document.createElement('div');
        messageElement.innerHTML = '<strong>' + message.username + ':</strong> ' + message.message;
        if (message.file) {
            const fileElement = document.createElement('a');
            fileElement.href = message.file;
            fileElement.textContent = ' (View File)';
            messageElement.appendChild(fileElement);
        }
        document.getElementById('messages').appendChild(messageElement);
    });
}
