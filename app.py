# import necessary libraries
import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect,
    send_from_directory)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################

from flask_sqlalchemy import SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///football.sqlite"

db = SQLAlchemy(app)

#################################################
# Models Setup
#################################################

class Premierleague_Foreign(db.Model):
    __tablename__ = 'premierleague_foreign_minutes'

    club = db.Column(db.String(64), primary_key=True)
    players_used = db.Column(db.Integer)
    non_foreigners_played = db.Column(db.Integer)
    used_foreign_players = db.Column(db.Integer)
    pct_minutes_non_foreigners = db.Column(db.Integer)
    pct_minutes_foreign_players = db.Column(db.Integer)

    def __repr__(self):
        return '<Premier League Foreign Minutes %r>' % (self.name)

class LigueOne_Foreign(db.Model):
    __tablename__ = 'ligue1_foreign_minutes'

    club = db.Column(db.String(64), primary_key=True)
    players_used = db.Column(db.Integer)
    non_foreigners_played = db.Column(db.Integer)
    used_foreign_players = db.Column(db.Integer)
    pct_minutes_non_foreigners = db.Column(db.Integer)
    pct_minutes_foreign_players = db.Column(db.Integer)

    def __repr__(self):
        return '<Ligue 1 Foreign Minutes %r>' % (self.name)

class LaLiga_Foreign(db.Model):
    __tablename__ = 'laliga_foreign_minutes'

    club = db.Column(db.String(64), primary_key=True)
    players_used = db.Column(db.Integer)
    non_foreigners_played = db.Column(db.Integer)
    used_foreign_players = db.Column(db.Integer)
    pct_minutes_non_foreigners = db.Column(db.Integer)
    pct_minutes_foreign_players = db.Column(db.Integer)

    def __repr__(self):
        return '<LaLiga Foreign Minutes %r>' % (self.name)


#################################################
# Page routes
#################################################

# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/team_foreign_minutes")
def foreign_minutes():
    return render_template("test2.html")

#################################################
# API routes
#################################################

@app.route("/api/laliga")
def laliga():
    results = db.session.query(LaLiga_Foreign.club, LaLiga_Foreign.players_used, LaLiga_Foreign.non_foreigners_played, LaLiga_Foreign.used_foreign_players, LaLiga_Foreign.pct_minutes_non_foreigners, LaLiga_Foreign.pct_minutes_foreign_players).all()

    club = [result[0] for result in results]
    players_used = [result[1] for result in results]
    non_foreigners_played = [result[2] for result in results]
    used_foreign_players = [result[3] for result in results]
    pct_minutes_non_foreigners = [result[4] for result in results]
    pct_minutes_foreign_players = [result[5] for result in results]

    laliga_data = [{
        "club": club,
        "players_used": players_used,
        "non_foreigners_played": non_foreigners_played,
        "used_foreign_players": used_foreign_players,
        "pct_minutes_non_foreigners": pct_minutes_non_foreigners,
        "pct_minutes_foreign_players": pct_minutes_foreign_players
    }]

    return jsonify(laliga_data)

@app.route("/api/ligue1")
def ligue1():
    results = db.session.query(LigueOne_Foreign.club, LigueOne_Foreign.players_used, LigueOne_Foreign.non_foreigners_played, LigueOne_Foreign.used_foreign_players, LigueOne_Foreign.pct_minutes_non_foreigners, LigueOne_Foreign.pct_minutes_foreign_players).all()

    club = [result[0] for result in results]
    players_used = [result[1] for result in results]
    non_foreigners_played = [result[2] for result in results]
    used_foreign_players = [result[3] for result in results]
    pct_minutes_non_foreigners = [result[4] for result in results]
    pct_minutes_foreign_players = [result[5] for result in results]

    ligue1_data = [{
        "club": club,
        "players_used": players_used,
        "non_foreigners_played": non_foreigners_played,
        "used_foreign_players": used_foreign_players,
        "pct_minutes_non_foreigners": pct_minutes_non_foreigners,
        "pct_minutes_foreign_players": pct_minutes_foreign_players
    }]

    return jsonify(ligue1_data)

@app.route("/api/premierleague")
def premierleague():
    results = db.session.query(Premierleague_Foreign.club, Premierleague_Foreign.players_used, Premierleague_Foreign.non_foreigners_played, Premierleague_Foreign.used_foreign_players, Premierleague_Foreign.pct_minutes_non_foreigners, Premierleague_Foreign.pct_minutes_foreign_players).all()

    club = [result[0] for result in results]
    players_used = [result[1] for result in results]
    non_foreigners_played = [result[2] for result in results]
    used_foreign_players = [result[3] for result in results]
    pct_minutes_non_foreigners = [result[4] for result in results]
    pct_minutes_foreign_players = [result[5] for result in results]

    premierleague_data = [{
        "club": club,
        "players_used": players_used,
        "non_foreigners_played": non_foreigners_played,
        "used_foreign_players": used_foreign_players,
        "pct_minutes_non_foreigners": pct_minutes_non_foreigners,
        "pct_minutes_foreign_players": pct_minutes_foreign_players
    }]

    return jsonify(premierleague_data)


#################################################
# Run app
#################################################

if __name__ == "__main__":
    app.run()
