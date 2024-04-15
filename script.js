document.getElementById('captureButton').addEventListener('click', function() {
    const video = document.getElementById('video');
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    
    canvas.toBlob(function(blob) {
        const formData = new FormData();
        formData.append('photo', blob);
        
        fetch('sendEmail.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.text())
        .then(data => alert(data))
        .catch(error => console.error('Error:', error));
    });
});

navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
        const video = document.getElementById('video');
        video.srcObject = stream;
    })
    .catch(function(error) {
        console.error('Error accessing the camera:', error);
    });
