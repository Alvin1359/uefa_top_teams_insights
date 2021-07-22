d3.json("/api/top_countries").then(data => {
  console.log(data)

  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
  })

  var markers = [];

  data.forEach(country => {
    markers.push(L.circleMarker([country.latitude, country.longitude], {
      radius: ((country.rating*100)/400),
      fillColor: "green",
      color: "black",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    }).bindPopup('<h3>'+country.country+'</h3><hr><p>Rating: '+ country.rating +'</h3><hr><p>Shots: ' + country.shots +'</h3><hr><p>Yellow Cards: ' + 
    country.yellow_cards +'</h3><hr><p>Red_Cards: ' + country.red_cards +'</p>' ));
  })

  var countryLayer = L.layerGroup(markers);

  var baseMaps = {
    "Street Map": streetmap
  };

  var overlayMaps = {
    "Countries": countryLayer
  };

  var myMap = L.map("map-id", {
    center: [48.2612, 2.6698],
    zoom: 5,
    layers: [streetmap, countryLayer]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap)
})