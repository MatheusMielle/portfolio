from flask import Flask, jsonify, request
import os
import requests
from urllib.parse import quote_plus
from flask_cors import CORS
dev = True

app = Flask(__name__)
CORS(app)

if not dev:
    LASTFM_API_KEY = os.getenv("LASTFM_API_KEY")
    LASTFM_USERNAME = os.getenv("LASTFM_USERNAME")
else:
    with open("variables.txt", "r") as f:
        lines = f.readlines()
        LASTFM_API_KEY = lines[0].strip().split('=')[1]
        LASTFM_USERNAME = lines[1].strip().split('=')[1]

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

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

