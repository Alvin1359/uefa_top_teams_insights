# import necessary libraries
import os
from typing import Counter
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

class Team_Data(db.Model):
    __tablename__ = 'all_team_data'

    team = db.Column(db.String(64), primary_key=True)
    tournament = db.Column(db.String(64))
    goals = db.Column(db.Integer)
    shots_pg = db.Column(db.Float)
    yellow_cards = db.Column(db.Integer)
    red_cards = db.Column(db.Integer)
    possesion_pct = db.Column(db.Float)
    pass_pct = db.Column(db.Float)
    aerialswon = db.Column(db.Float)
    rating = db.Column(db.Float)
    country = db.Column(db.String(64))
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)

    def __repr__(self):
        return '<All Team Data %r>' % (self.name)

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

class Chelsea_Players(db.Model):
    __tablename__ = 'chelsea_players'

    player = db.Column(db.String(64), primary_key=True)
    club = db.Column(db.String(64))
    nationality = db.Column(db.String(64))
    coordinates = db.Column(db.String(64))
    country = db.Column(db.String(64))
    latitude = db.Column(db.Integer)
    longitude = db.Column(db.Integer)

    def __repr__(self):
        return '<Chelsea Players %r>' % (self.name)


#################################################
# Page routes
#################################################

# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/all_team_data")
def team_data():
    return render_template("Graph_1.html")

@app.route("/team_foreign_minutes")
def foreign_minutes():
    return render_template("test2.html")


#################################################
# API routes
#################################################

@app.route("/api/all_team_data")
def teamData():
    results = db.session.query(Team_Data.team, Team_Data.tournament, Team_Data.goals, Team_Data.shots_pg, Team_Data.yellow_cards, Team_Data.red_cards, Team_Data.possesion_pct, Team_Data.pass_pct, Team_Data.aerialswon, Team_Data.rating, Team_Data.country, Team_Data.latitude, Team_Data.longitude).all()

    team = [result[0] for result in results]
    tournament = [result[1] for result in results]
    goals = [result[2] for result in results]
    shots_pg = [result[3] for result in results]
    yellow_cards = [result[4] for result in results]
    red_cards = [result[5] for result in results]
    possession_pct = [result[6] for result in results]
    pass_pct = [result[7] for result in results]
    aerialswon = [result[8] for result in results]
    rating = [result[9] for result in results]
    country = [result[10] for result in results]
    latitude = [result[11] for result in results]
    longitude = [result[12] for result in results]

    team_data = [{
        "team": team,
        "tournament": tournament,
        "goals": goals,
        "shots_pg": shots_pg,
        "yellow_cards": yellow_cards,
        "red_cards": red_cards,
        "possession_pct": possession_pct,
        "pass_pct": pass_pct,
        "aerialswon": aerialswon,
        "rating": rating,
        "country": country,
        "latitude": latitude,
        "longitude": longitude
    }]

    return jsonify(team_data)

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


@app.route("/api/chelsea_players")
def chelseaplayers():
    results = db.session.query(Chelsea_Players.player, Chelsea_Players.club, Chelsea_Players.nationality, Chelsea_Players.coordinates, Chelsea_Players.country, Chelsea_Players.latitude, Chelsea_Players.longitude).all()

    player = [result[0] for result in results]
    club = [result[1] for result in results]
    nationality = [result[2] for result in results]
    coordinates = [result[3] for result in results]
    country = [result[4] for result in results]
    latitude = [result[5] for result in results]
    longitude = [result[6] for result in results]

    chelsea_players = {
        "type": "Feature",
        "geometry": {
        "type": "Point",
        "coordinates": [longitude, latitude]
    },
    "properties": {
        "player": player,
        "club": club,
        "nationality": nationality,
        "country": country
     }
    }

    return jsonify(chelsea_players)

#################################################
# Run app
#################################################

if __name__ == "__main__":
    app.run()
