from flask import Flask
from models import db

# Initialize the Flask app
app = Flask(__name__)

# Configure the SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'  # SQLite database file
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable modification tracking

# Initialize the database with the app
db.init_app(app)

# Create the database tables
with app.app_context():
    db.create_all()
    print("Database tables created successfully!")