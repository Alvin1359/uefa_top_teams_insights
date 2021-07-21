function compareFunction(firstNum, secondNum){
    return secondNum - firstNum;
}

d3.json("laliga.json").then(function(response) {
    console.log(response);

    var club = response[0].club;
    // var players_used = response[0].players_used;
    var non_foreign_players = response[0].non_foreigners_played.sort(compareFunction);
    var foreign_players = response[0].used_foreign_players.sort(compareFunction);
    // var pct_minutes_non_foreign = response[0].pct_minutes_non_foreigners;
    var pct_minutes_foreign = response[0].pct_minutes_foreign_players;

    // console.log(pct_minutes_foreign)

      // ==========================
  //   FOREIGN PLAYER MINUTES
  // ==========================
  var trace1 = {
    type: "bar",
    x: club,
    y: pct_minutes_foreign,
    line: {
      color: "#17BECF"
    }
  };

  var data = [trace1];

  var layout = {
    title: `LIGUE1 Foreign Player Minutes Percentages`,
    xaxis: {
      title: "Clubs"
    },
    yaxis: {
      title: "% minutes foreign players"
    }
  };

  Plotly.newPlot("plot", data, layout);
  
  // ==========================
  //   FOREIGN PLAYER NUMBERS
  // ==========================
  var trace2 = {
    type: "bar",
    name: "Foreign Players",
    x: club,
    y: foreign_players,
    line: {
      color: "#17BECF"
    }
  };

  var trace3 = {
    type: "bar",
    name: "Non-Foreign Players",
    x: club,
    y: non_foreign_players,
    line: {
      color: "#17BECF"
    }
  };

  var data2 = [trace2, trace3];

  var layout2 = {
    title: `LIGUE1 Foreign Player Numbers`,
    legend: {
      x: 1,
      xanchor: 'right',
      y: 1
    },
    xaxis: {
      title: "Clubs",
      automargin: true
    },
    yaxis: {
      title: "Foreign vs Non-Foreign Players"
    },
    barmode: "stack"
  };

  Plotly.newPlot("plot2", data2, layout2);
});
