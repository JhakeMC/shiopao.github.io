from flask import Flask, render_template, request, send_from_directory, jsonify, abort
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/save', methods=['POST'])
def save():
    content = request.form['content']
    filename = request.form['filename']
    if filename == "":
        filename = "Untitled.txt"
    else:
        filename += ".txt"
    with open(os.path.join('saved_files', filename), 'w') as f:
        f.write(content)
    return f"File saved as {filename}"

@app.route('/files', methods=['GET'])
def list_files():
    files = [f for f in os.listdir('saved_files') if os.path.isfile(os.path.join('saved_files', f))]
    return jsonify(files)

@app.route('/files/<filename>', methods=['GET'])
def get_file(filename):
    try:
        with open(os.path.join('saved_files', filename), 'r') as f:
            content = f.read()
        return jsonify({'filename': filename, 'content': content})
    except IOError:
        abort(404)

if __name__ == '__main__':
    if not os.path.exists('saved_files'):
        os.makedirs('saved_files')
    app.run(debug=True)
