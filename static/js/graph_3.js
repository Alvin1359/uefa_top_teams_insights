d3.json("/api/all_team_data").then(function(response) {
    console.log(response);    

    
    var teams = response[0].country;
    var goals = response[0].goals;
    var shots = response[0].shots_pg;
    var yellow_cards = response[0].yellow_cards;
    var red_cards = response[0].red_cards;
    var possesions_pct = response[0].possession_pct;
    var pass_pct = response[0].pass_pct;
    var aerials_won = response[0].aerialswon;
    var rating = response[0].rating;

    var possesions = possesions_pct.map(x => x/100)
    var pass = pass_pct.map(x => x/100)


    var GoalTrace = {
        x: teams,
        y: goals,
        name: "Goals",
        marker:{
            color: "green"},
        type: "bar",
    };

    var ShotsTrace = {
        x: teams,
        y: shots,
        name: "Shots",
        marker:{
            color: "orange"},
        type: "bar"
    };

    var YellowTrace = {
        x: teams,
        y: yellow_cards,
        name: "Yellow Cards",
        marker:{
            color: "#D4AF37"},
        type: "bar",
    };

    var RedTrace = {
        x: teams,
        y: red_cards,
        name: "Red Cards",
        marker:{
            color: "red"},
        type: "bar",
    };

    var PossesionTrace = {
        x: teams,
        y: possesions,
        name: "Possesions",
        marker:{
            color: "blue"},
        type: "bar",
    };

    var PassTrace = {
        x: teams,
        y: pass,
        name: "Pass",
        marker:{
            color: "brown"},
        type: "bar",
    };

    var AreailWinsTrace = {
        x: teams,
        y: aerials_won,
        name: "Areal Wins",
        marker:{
            color: "#8feb34"},
        type: "bar",
    };

    var RatingsTrace = {
        x: teams,
        y: rating,
        name: "Ratings",
        marker:{
            color: "#8c34eb"},
        type: "bar",
    };
  
  
      // data
      var barData = [GoalTrace, ShotsTrace, YellowTrace, RedTrace, PossesionTrace, PassTrace, AreailWinsTrace, RatingsTrace];
  
      // Apply the group bar mode to the layout
      var barLayout = {
        title: "Team Statistics",
        xaxis: {title: "Teams (by Country)"},
        yaxis: {title: "Statistics"},
        barmode: 'group',
        margin: {
          l: 100,
          r: 100,
          t: 100,
          b: 100
        }
      };
  
      Plotly.newPlot("bar_chart", barData, barLayout);
});