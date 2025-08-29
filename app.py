from flask import Flask, render_template, request, jsonify, send_from_directory
import os

app = Flask(__name__)

# Config: upload folder (optional; not saving files permanently for now)
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/")
def index():
    return render_template("index.html")

# Serve animal images from static folder (Flask handles /static by default)
# No special route needed for images.

# Handle file upload
@app.route("/upload", methods=["POST"])
def upload():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    # Optionally save file if needed -- not required here
    # file.save(os.path.join(UPLOAD_FOLDER, file.filename))
    
    # Respond with file details
    response = {
        "filename": file.filename,
        "content_type": file.content_type,
        "size": len(file.read())
    }
    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)
