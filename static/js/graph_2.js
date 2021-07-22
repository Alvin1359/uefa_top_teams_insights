function compareFunction(firstNum, secondNum){
    return secondNum - firstNum;
}

function init() {
d3.json("/api/laliga").then(function(response) {
    console.log(response);

    var club = response[0].club;
    var non_foreign_players = response[0].non_foreigners_played.sort(compareFunction);
    var foreign_players = response[0].used_foreign_players.sort(compareFunction);
    var pct_minutes_foreign = response[0].pct_minutes_foreign_players;

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
    title: `LALIGA Foreign Player Minutes Percentages`,
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
    title: `LALIGA Foreign Player Numbers`,
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
}

function changePlot() {
  var dropdownMenu = d3.select("#selDataset");

  var dataset = dropdownMenu.property("value");

  var url;

  // changing table image based on league selected
  if (dataset === "laliga") {
    document.getElementById("image").src="../static/image/table_laliga.jpg";
    url = "/api/laliga";
  } else if (dataset === "premierleague") {
    document.getElementById("image").src="../static/image/table_premierleague.jpg";
    url = "/api/premierleague"
  } else {
    document.getElementById("image").src="../static/image/table_ligue1.jpg";
    url = "/api/ligue1"
  };
  
  d3.json(url).then(function(response) {
    console.log(response);

    var club = response[0].club;
    var non_foreign_players = response[0].non_foreigners_played.sort(compareFunction);
    var foreign_players = response[0].used_foreign_players.sort(compareFunction);
    var pct_minutes_foreign = response[0].pct_minutes_foreign_players;

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
      title: `${dataset.toUpperCase()} Foreign Player Minutes Percentages`,
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
    name: "Non Foreign Players",
    x: club,
    y: non_foreign_players,
    line: {
      color: "#17BECF"
    }
  };

  var data2 = [trace2, trace3];

  var layout2 = {
    title: `${dataset.toUpperCase()} Foreign Player Numbers`,
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
}

// call changePlot() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", changePlot);


init();