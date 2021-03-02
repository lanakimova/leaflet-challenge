

var layerGroup = L.layerGroup();

d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson', function(d) {
    
    var features = d.features;
    
    features.forEach(function(feature) {

        earthquakeDate = new Date(feature.properties.time);
        humanDateFormat = earthquakeDate.toLocaleString('en-US', {timeZoneName: 'short'});
        
       L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
            color: color(feature.geometry.coordinates[2]),
            fillColor: color(feature.geometry.coordinates[2]),
            fillOpacity: 0.5,
            radius: radius(feature.properties.mag)
        }).bindPopup(`<b>Earthquake ID: </b> ${feature.id}<br>
                    <b>Magnitude: </b>${feature.properties.mag}<br>
                    <b>Location: </b> ${feature.properties.place}<br>
                    <b>Time: </b> ${humanDateFormat}`).addTo(layerGroup);
     
    });  
});


var tectonicGroupLayer = L.layerGroup();
var tectinicPlatesPoly = d3.json("static/data/plates.json", function(data) { 
    var poly = data.features;  
    poly.forEach(el => {
        L.geoJSON(el.geometry).bindPopup(`Plate Name: ${el.properties.PlateName}`).addTo(tectonicGroupLayer);
    })    
});

// Create a couple of base layers for map 
var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/satellite-v9",
  accessToken: API_KEY
});

var outdoors = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/outdoors-v11",
  accessToken: API_KEY
});

// 3. Identify map 
var myMap = L.map('map-id', {
    center: [37.0902, -95.7129],
    zoom: 3,
    layers: [outdoors, layerGroup]
});

// create a base layer
var basemaps = {
    "Satellite": satellite,
    "Outdoors": outdoors,
};
// create an overlay layer with earthquake
var overlayMaps = {
    "Earthquakes": layerGroup,
    // "Tictonic Plates": tectonicPlatesGroupLayer
    "Tectonic Plates": tectonicGroupLayer

};
//  add control layer
L.control.layers(basemaps, overlayMaps).addTo(myMap);

var legend = L.control({position: 'bottomright'});
legend.onAdd = function(myMap) {
                                var div = L.DomUtil.create('div', 'info legend'),
                                    grades = [-10, 10, 30, 50, 70, 90];
            
                                    for (var i = 0; i < grades.length; i++) {
                                        div.innerHTML +=
                                        '<i style="background:' + color(grades[i] + 1) + '"></i> ' +
                                        grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
                                     }
    return div;
};
legend.addTo(myMap);

function color(earthquakeDepth) {
    if (earthquakeDepth < 10){
        // light green
        return '#9be815'
    }
    else if (earthquakeDepth < 30) {
        // green
        return '#7bbd09'
    }
    else if (earthquakeDepth < 50) {
        // light orange
        return '#ffba08'
    }
    else if (earthquakeDepth < 70) {
        // orange
        return '#f48c06'
    }
    else if (earthquakeDepth < 90) {
        // dark orange
        return '#e85d04'
    }
    else if (earthquakeDepth >= 90) {
        // red
        return '#d00000'
    }

};

function radius(earthquakeMagnitude) {
    if (earthquakeMagnitude <= 1) {
        return 10000;
    } 
    else if (earthquakeMagnitude <= 2) {
        return 20000;
    } 
    else if (earthquakeMagnitude <= 3) {
        return 30000;
    } 
    else if (earthquakeMagnitude <= 4) {
        return 40000;
    } 
    else if (earthquakeMagnitude <= 5) {
        return 50000;
    } 
    else if (earthquakeMagnitude <= 6) {
        return 60000;
    } 
    else if (earthquakeMagnitude <= 7) {
        return 70000;
    } 
    else if (earthquakeMagnitude <= 8) {
        return 80000;
    } 
    else if (earthquakeMagnitude <= 9) {
        return 90000;
    } 
    else if (earthquakeMagnitude <= 10) {
        return 100000;
    };
};
