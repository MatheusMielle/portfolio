########################################################################
#                                   Imports                            #
########################################################################
from flask import Flask, jsonify, request
import os
import requests
from urllib.parse import quote_plus
from flask_cors import CORS
from flask_mail import Mail, Message
from flask_jwt_extended import JWTManager, create_access_token, set_access_cookies, verify_jwt_in_request, get_jwt_identity, unset_jwt_cookies
import pymysql
from datetime import timedelta
from functools import wraps
from dotenv import load_dotenv


######################################################################
#                         Global Variables                           #
######################################################################
DEVELOPMENT = os.getenv("DEVELOPMENT", "TRUE")

if DEVELOPMENT == "TRUE":
    load_dotenv(dotenv_path="variables.txt")

LASTFM_API_KEY = os.getenv("LASTFM_API_KEY")
LASTFM_USERNAME = os.getenv("LASTFM_USERNAME")
MAIL_USERNAME = os.getenv("MAIL_USERNAME")
MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
MYSQL_HOST = os.getenv("MYSQL_HOST")
MYSQL_DATABASE = os.getenv("MYSQL_DATABASE")
MYSQL_USERNAME = os.getenv("MYSQL_USERNAME")
MYSQL_PASSWORD = os.getenv("MYSQL_PASSWORD")
USERNAME = os.getenv("USERNAME")
PASSWORD = os.getenv("PASSWORD")
JWT_SECRET = os.getenv("JWT_SECRET")    

app = Flask(__name__) # Set up Flask app

# JWT Configuration
app.config["JWT_SECRET_KEY"] = JWT_SECRET
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config["JWT_ACCESS_COOKIE_PATH"] = "/"
app.config["JWT_COOKIE_CSRF_PROTECT"] = DEVELOPMENT != "TRUE"  # Enable True in production
app.config["JWT_COOKIE_HTTPONLY"] = True
app.config["JWT_COOKIE_SECURE"] = DEVELOPMENT != "TRUE"  # Enable True in production
app.config["JWT_COOKIE_SAMESITE"] = "Lax"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)

# Flask Mail Configuration
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 465
app.config["MAIL_USERNAME"] = MAIL_USERNAME
app.config["MAIL_PASSWORD"] = MAIL_PASSWORD
app.config["MAIL_USE_TLS"] = False
app.config["MAIL_USE_SSL"] = True
mail = Mail(app)

# CORS Configuration
if DEVELOPMENT == "TRUE":
    CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

####################################################################
#                           JWT Authentication                     #
####################################################################
def jwt_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        try:
            verify_jwt_in_request() 
            identity = get_jwt_identity()
            username = identity.split("+")[0]
            permission_level = int(identity.split("+")[1])

            if permission_level != 0:
                return jsonify({"message": "Forbidden: insufficient permissions"}), 403
            
        except Exception as e:
            return jsonify({"message": "Missing or invalid token"}), 401

        func_params = f.__code__.co_varnames
        if 'username' in func_params:
            kwargs['username'] = username
        if 'permission_level' in func_params:
            kwargs['permission_level'] = permission_level

        return f(*args, **kwargs)
    return decorated


####################################################################
#                           Non-JWT Routes                         #
####################################################################

# Health Check
@app.route('/api/health')
def health_check():
    return jsonify({"status": "ok"}), 200

# User Login
@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    connection = pymysql.connect(
        host=MYSQL_HOST,
        user=MYSQL_USERNAME,
        password=MYSQL_PASSWORD,
        database=MYSQL_DATABASE
    )
    cursor = connection.cursor()
    cursor.execute("SELECT permission_level FROM users " \
    "WHERE username=%s AND password=%s", (data.get('username'), data.get('password')))
    result = cursor.fetchone()
    cursor.close()
    connection.close()

    permission_level = int(result[0]) if result else None

    if permission_level is None:
        return jsonify({"message": "Invalid credentials", "auth": False})

    access_token = create_access_token(identity=f"{data.get('username')}+{permission_level}")
   
    response = jsonify({"message": "Login successful!", "auth": True})

    set_access_cookies(response, access_token, max_age=3600)
    return response

# Recent Tracks
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

# Search YouTube
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

# Send Email
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
                  recipients=[app.config['MAIL_USERNAME']]) 
    msg.body = f"""
    You have received a new message from your portfolio contact form:

    Name: {name}
    Email: {email}
    Message: {message}
    """

    try:
        mail.send(msg)
        return jsonify({'success': 'Message sent successfully!'})
    except Exception as e:
        print(e)
        return jsonify({'error': 'Failed to send email'}), 500

###########################################################################
#                          JWT Authentication Routes                      #             
###########################################################################
@app.route('/api/user/whoami', methods=['GET'])
@jwt_required
def whoami(username, permission_level):
    return jsonify({"user": username, "permission_level": permission_level}), 200

@app.route('/api/auth/logout', methods=['POST'])
@jwt_required
def logout():
    try:
        response = jsonify({"message": "Logout successful!"})
        unset_jwt_cookies(response)
        return response, 200
    except Exception as e:
        # Log the error if you want for debugging
        print(f"Logout error: {str(e)}")
        return jsonify({"message": "Logout failed", "error": str(e)}), 500
    

    



if DEVELOPMENT == "TRUE":
    app.run(host="0.0.0.0", port=5000)

