d3.json("/api/all_player_data").then(data => {
    console.log(data)

    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
  })


  // create marker cluster group
  var markers = L.markerClusterGroup();
  var chelseaMarkers = L.markerClusterGroup();
  var manchesterMarkers = L.markerClusterGroup();
  var psgMarkers = L.markerClusterGroup();
  var realmadridMarkers = L.markerClusterGroup();

  // Initialize an array to hold player markers
  var allMarkers = [];
  var chelseaPlayerMarkers = [];
  var manchesterPlayerMarkers = [];
  var psgPlayerMarkers = [];
  var realmadridPlayerMarkers = [];

  // Loop through the data array
  data.forEach(player => {

    if (player.club == "Chelsea FC") {
    // For each player, create a marker and bind a popup with the player's name
    var marker = chelseaMarkers.addLayer(L.marker([player.lat, player.lon])
    .bindPopup("<h3>" + player.player + "</h3>" + "Club: " + player.club + "<br>Country: " + player.country))
    var marker2 = markers.addLayer(L.marker([player.lat, player.lon])
    .bindPopup("<h3>" + player.player + "</h3>" + "Club: " + player.club + "<br>Country: " + player.country));
    // Add the marker to array
    chelseaPlayerMarkers.push(marker);
    allMarkers.push(marker2);

    } else if (player.club == "Manchester City") {
        // For each player, create a marker and bind a popup with the player's name
        var marker = manchesterMarkers.addLayer(L.marker([player.lat, player.lon])
        .bindPopup("<h3>" + player.player + "</h3>" + "Club: " + player.club + "<br>Country: " + player.country))
        var marker2 = markers.addLayer(L.marker([player.lat, player.lon])
        .bindPopup("<h3>" + player.player + "</h3>" + "Club: " + player.club + "<br>Country: " + player.country));
        // Add the marker to array
        manchesterPlayerMarkers.push(marker);
        allMarkers.push(marker2);

    } else if (player.club == "Paris Saint-Germain") {
        // For each player, create a marker and bind a popup with the player's name
        var marker = psgMarkers.addLayer(L.marker([player.lat, player.lon])
        .bindPopup("<h3>" + player.player + "</h3>" + "Club: " + player.club + "<br>Country: " + player.country))
        var marker2 = markers.addLayer(L.marker([player.lat, player.lon])
        .bindPopup("<h3>" + player.player + "</h3>" + "Club: " + player.club + "<br>Country: " + player.country));
        // Add the marker to array
        psgPlayerMarkers.push(marker);
        allMarkers.push(marker2);

    } else if (player.club == "Real Madrid") {
        // For each player, create a marker and bind a popup with the player's name
        var marker = realmadridMarkers.addLayer(L.marker([player.lat, player.lon])
        .bindPopup("<h3>" + player.player + "</h3>" + "Club: " + player.club + "<br>Country: " + player.country))
        var marker2 = markers.addLayer(L.marker([player.lat, player.lon])
        .bindPopup("<h3>" + player.player + "</h3>" + "Club: " + player.club + "<br>Country: " + player.country));
        // Add the marker to array
        realmadridPlayerMarkers.push(marker);
        allMarkers.push(marker2);
    }
  });

  var allPlayerLayer = L.layerGroup(allMarkers);
  var chelseaPlayerLayer = L.layerGroup(chelseaPlayerMarkers);
  var manchesterPlayerLayer = L.layerGroup(manchesterPlayerMarkers);
  var psgPlayerLayer = L.layerGroup(psgPlayerMarkers);
  var realmadridPlayerLayer = L.layerGroup(realmadridPlayerMarkers);


  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightmap
  };


  // Create an overlayMaps object to hold the bikeStations layer
  var overlayMaps = {
    "All Players": allPlayerLayer,
    "Chelsea Players": chelseaPlayerLayer,
    "Manchster United Players": manchesterPlayerLayer,
    "PSG Players": psgPlayerLayer,
    "Real Madrid Players": realmadridPlayerLayer
  };

  // Create the map object with options
  var myMap = L.map("map-id", {
    center: [
      20.3128, -40.0415
    ],
    zoom: 3,
    layers: [lightmap, allPlayerLayer, chelseaPlayerLayer, manchesterPlayerLayer, psgPlayerLayer, realmadridPlayerLayer]
  });


  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap)

});
  