function saveText() {
    const content = document.getElementById('notepad').value;
    const filename = document.getElementById('filename').value;
    fetch('/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `content=${encodeURIComponent(content)}&filename=${encodeURIComponent(filename)}`
    }).then(response => response.text())
    .then(data => alert(data));
}

function loadFiles() {
    fetch('/files')
        .then(response => response.json())
        .then(data => {
            const fileList = document.getElementById('fileList');
            fileList.innerHTML = '';
            data.forEach(file => {
                const fileElement = document.createElement('li');
                fileElement.textContent = file;
                fileElement.onclick = () => loadFile(file);
                fileList.appendChild(fileElement);
            });
        });
}

function loadFile(filename) {
    fetch(`/files/${filename}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('filename').value = data.filename.replace('.txt', '');
            document.getElementById('notepad').value = data.content;
        });
}
