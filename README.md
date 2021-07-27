# Union of European Football Associations (UEFA) Insights of Top Teams

![UEFA champions league](https://editorial.uefa.com/resources/0269-1267e78b6989-ccff720e93c4-1000/manchester_city_v_chelsea_fc_-_uefa_champions_league_final.jpeg)

This Project aims to Utilise The UEFA Champions League Team and Player stats to outline the Nationality diversity amongst the UEFA Champions league top 4 Teams of the 2020-21 Season. By gathering multiple dataset statistics, the objective is to analyse, dissect and extract the important data to be readily available for useful application. 
   
Our Question: **DO PLAYERS OF FOREIGN NATIONALITIES AFFECT THE PERFORMANCE OF THE TEAM?**


## Assignment structure
```
project  
|__ resources/             # contains csv datasets, web scraping, data merging and cleaning notebooks
|
|__ static/                              
|         |_ css/          # contains css styling sheet
|         |_ image/        # contains images used in website
|         |_ js/           # contains logic to create each graph
| 
|
|__ templates/             # contains html files used to render each page
|
|__ .gitignore             # gitignore file
|
|__  app.py                # python file to start local server
|
|__  football.sqlite       # database containing all data tables
|
|__  Procfile              # Heroku usage
|
|__ README.md              # Readme file
|
|__ requirements.txt       # Lists requirements needed by Heroku
```

## Usage

Dependencies and Setup
```
from bs4 import BeautifulSoup
import requests
import pandas as pd
import json
from sqlalchemy import create_engine
from geojson import Feature, FeatureCollection, Point

```
To run locally, run `app.py`
```
(CMD Line) python app.py
```
Enter your API Key for [Mapbox](https://www.mapbox.com/) under `static/js/config.js`
```
// API key
const API_KEY = "<YOUR KEY HERE>";
```



## Data Sources:

|No|Source|Link|
|-|-|-|
|1|Kaggle|https://www.kaggle.com/varpit94/football-teams-rankings-stats|
|2|transfermarkt|https://www.transfermarkt.co.uk/manchester-city/kader/verein/281/saison_id/2021|
|3|Kaggle|https://www.kaggle.com/rajatrc1705/english-premier-league202021|


## Technical Requirements
1. Visualisation must inclue a Python Flask - powered API, HTML/CSS, JavaScript and a SQLite database
2. Must use one of the visualisation libraries:
   - D3.js
   - Leaflet.js
   - Plotly.js
3. Dataset must contain at least 100 records
4. Visuals must have some level of user interaction (e.g. dropdown, popups)
5. The final web page needs to include at least:
   - 4 visualisations
   - 3 pages
6. Deploy your web application to [Heroku](https://www.heroku.com/)

## Flask App Creation
### Flask and Database Setup
```
app = Flask(__name__)

from flask_sqlalchemy import SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///football.sqlite"

db = SQLAlchemy(app)
```
### Models Setup Example
```
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
```
### Page Routes Example
```
@app.route("/all_team_data")
def team_data():
    return render_template("Graph_3.html")
```
### API Route Creation Example
```
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
```
### Final API Routes
```
@app.route("/api/all_team_data")
@app.route("/api/laliga")
@app.route("/api/ligue1")
@app.route("/api/premierleague")
@app.route("/api/all_player_data")
@app.route("/api/chelsea_players")
@app.route("/api/manchesterunited_players")
@app.route("/api/psg_players")
@app.route("/api/realmadrid_players")
@app.route("/api/top_countries")
```
### Running app
```
if __name__ == "__main__":
    app.run()
```
## Final Heroku Deployment
The final web page is located in the following link: https://uefa--top4-insights-al001.herokuapp.com/

## Conclusion
- In summary, teams who have more minutes played by foreign players are likely to be closer to the top of the table in their respective leagues  
- Bottom 3 teams in each league for foreign player minutes percentage do not make the top 10 in the league table (excluding Stade Rennais, Ligue 1)  
  
Ligue 1:
- 3 of the top 4 teams have 60%+ percentage of their player minutes played by foreign players - All 4 teams have more foreign palyers than native players in their lineup

LaLiga:
- All 4 of top 4 teams have 60% or more percentage of player minutes played by foreign players
- All 4 have more foreign players than native players in their lineup

Premier League:
- All 4 of top 4 teams have 60% percentage of their player minutes played by foreign players
- All 4 have more foreign players than native players in their lineup  
  
From the data set utilised for the GeoMapping, roughly 30 percent of the team players originate (Nationality) from that origin. i.e ~34% of Chelsea Players are from England. Although, there are limitations
to the dataset making it skewed. A significantly higher number of players are not native to that origin, rather chose to adopt their nationality due to dual citizenship.

## Contributors
- [@Alvin](https://github.com/Alvin1359)
- [@Petra](https://github.com/PetraMoyle)
- [@Sri](https://github.com/srivegunta)
- [@Ernest](https://github.com/KenyanBoy)