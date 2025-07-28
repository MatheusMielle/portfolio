from flask import Flask, jsonify, request
import os
import requests
from urllib.parse import quote_plus
from flask_cors import CORS
from flask_mail import Mail, Message
dev = False
app = Flask(__name__)

if not dev:
    LASTFM_API_KEY = os.getenv("LASTFM_API_KEY")
    LASTFM_USERNAME = os.getenv("LASTFM_USERNAME")
    MAIL_USERNAME = os.getenv("MAIL_USERNAME")
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
else:
    with open("variables.txt", "r") as f:
        lines = f.readlines()
        LASTFM_API_KEY = lines[0].strip().split('=')[1]
        LASTFM_USERNAME = lines[1].strip().split('=')[1]
        MAIL_USERNAME = lines[2].strip().split('=')[1]
        MAIL_PASSWORD = lines[3].split('=')[1]


app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 465
app.config["MAIL_USERNAME"] = MAIL_USERNAME
app.config["MAIL_PASSWORD"] = MAIL_PASSWORD
app.config["MAIL_USE_TLS"] = False
app.config["MAIL_USE_SSL"] = True

mail = Mail(app)
CORS(app)

if not dev:
    LASTFM_API_KEY = os.getenv("LASTFM_API_KEY")
    LASTFM_USERNAME = os.getenv("LASTFM_USERNAME")
else:
    with open("variables.txt", "r") as f:
        lines = f.readlines()
        LASTFM_API_KEY = lines[0].strip().split('=')[1]
        LASTFM_USERNAME = lines[1].strip().split('=')[1]

@app.route('/api/health')
def health_check():
    return jsonify({"status": "ok"}), 200

@app.route('/api/recent-tracks')
def recent_tracks():
    
    if not LASTFM_API_KEY or not LASTFM_USERNAME:
        return jsonify({"error": "Missing LASTFM credentials"}), 500

    url = (
        f"https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks"
        f"&user={LASTFM_USERNAME}&api_key={LASTFM_API_KEY}&format=json&limit=10"
    )
    res = requests.get(url)
    data = res.json()

    tracks = []
    for item in data.get('recenttracks', {}).get('track', []):
        tracks.append({
            "artist": item["artist"]["#text"],
            "track": item["name"],
            "album": item["album"]["#text"],
            "image": item["image"][-1]["#text"] if item["image"] else "",
            "url": item["url"]
        })

    return jsonify(tracks)

@app.route('/api/search-youtube')
def search_youtube():
    query = request.args.get("query")
    if not query:
        return jsonify({"error": "Missing query parameter"}), 400

    search_url = f"https://www.youtube.com/results?search_query={quote_plus(query)}"
    res = requests.get(search_url)
    for line in res.text.split('"'):
        if "/watch?v=" in line:
            return jsonify({"url": f"https://www.youtube.com{line}".split('\\')[0]})

    return jsonify({"error": "No video found"}), 404

@app.route('/api/send-email', methods=['POST'])
def send_email():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')

    if not name or not email or not message:
        return jsonify({'error': 'Missing fields'}), 400

    # Compose email
    msg = Message(subject=f"New message from {name}",
                  sender=app.config['MAIL_USERNAME'],
                  recipients=[app.config['MAIL_USERNAME']])  # send to yourself
    msg.body = f"""
    You have received a new message from your portfolio contact form:

    Name: {name}
    Email: {email}
    Message: 
    {message}
    """

    try:
        mail.send(msg)
        return jsonify({'success': 'Message sent successfully!'})
    except Exception as e:
        print(e)
        return jsonify({'error': 'Failed to send email'}), 500

# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5000)

