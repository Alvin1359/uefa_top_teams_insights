# Union of European Football Associations (UEFA) Project
Week 18 - Group 1

![UEFA champions league](https://editorial.uefa.com/resources/0269-1267e78b6989-ccff720e93c4-1000/manchester_city_v_chelsea_fc_-_uefa_champions_league_final.jpeg)

This Project aims to Utilise EPL Player stats to build an EPL Dream team. By gathering multiple dataset statistics, the objective is to analyse, dissect and extract the important data to be readily available for useful application.


## Assignment structure
```
Heroku-Project
| 
|__ images/          
|   |__ 20-21_table.png![20-21_table](https://user-images.githubusercontent.com/80458900/126598712-e23c850f-c443-4881-9c93-f46ea2f63ed2.png)
|   |__ ChampionsLeague.PNG
|   |__ Chelswa_img1.jpg
|   |__ Manchester_City_img4.jpg
    |__ nav_bar_img.png
    |__ Paris_Saint_Germain_img3.jpg
    |__ Real_Madrid_img2.jpg
    |__ UEFA_clubs.PNG
|
|__ Resources/
|   |__ Team Data/
|      |__ chelsea_players.csv
|      |__ Footballteams.csv
|      |__ laliga_foreign_player_mminutes.csv
|      |__ manchester_play.csv
|   |__ premierleague_forign_player_minutes.csv
|   |__ psg_players.csv
|   |__ real_madrid_players.csv
|   |__ soccer_player_webscraping.ipynbv
|   |__ world_country_latitude_and_longitude_values.csv
|   
|   
|
|__ SQL/
|   |__ SQlite databse creation
|
|__ .gitignore 
|__ .ipynb
|__ Teams.ipynb
|__ README - Project Guidelines.md
|__ README - Project Proposal.md
|__ README.md
| 

```

## Usage

```
# Dependencies and Setup

from bs4 import BeautifulSoup
import requests
import pandas as pd
import json
from sqlalchemy import create_engine
from geojson import Feature, FeatureCollection, Point

```


## Data Sources:

|No|Source|Link|
|-|-|-|
|1|Kaggle|https://www.kaggle.com/varpit94/football-teams-rankings-stats|
|2|Kaggle|https://www.transfermarkt.co.uk/manchester-city/kader/verein/281/saison_id/2021|
|3|Kaggle|https://www.kaggle.com/rajatrc1705/english-premier-league202021|


## Datasets 

|No|Source|Link|
|-|-|-|
|1|Team_Data.geojson|https://github.com/KenyanBoy/HML-Project/blob/main/Resources/Team_Data.geojson|
|2|Footballteams.csv|LINK|
|3|laliga_foreign_player_mminutes.csv|LINK|
|4|manchester_play.csv|LINK|
|5|premierleague_forign_player_minutes.csv|LINK|
|6|psg_players.csv|LINK|
|7|real_madrid_players.csv|LINK|
|8|world_country_latitude_and_longitude_values.csv|LINK|
|9|chelsea_players.csv|LINK|


## Project Task Breakdown:

![Javascript.PNG](https://www.amcharts.com/wp-content/uploads/2018/11/amcharts_share.jpg)

1. Research
2. Acquire datasets
3. Clean datasets
    1. Jupyter notebook
    2. Create GeoJSON files
4. Create database SQL
    1. load dataframes
    2. upload them on app.js ustilising the Flask library



## Proposal

A copy of the Project proposal is located in the following link: []

## Contributors
- [@Sri](https://github.com/srivegunta)
- [@Ernest](https://github.com/KenyanBoy)
- [@Alvin](https://github.com/Alvin1359)
- [@Petra](https://github.com/PetraMoyle)
