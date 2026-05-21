from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')
    
    # In a real app, you would send an email or save to a database here.
    print(f"New Message from {name} ({email}): {message}")
    
    return jsonify({"status": "success", "message": "Message received! We'll get back to you soon."}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
