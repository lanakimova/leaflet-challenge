
var myMap = L.map("map-id", { center: [37.0902, -95.7129], zoom: 3});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson', function(d) {
    
    var features = d.features;
    var coordinates = [];
    var mag = [];
    
    features.forEach(function(feature) {
     
        var circle = L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
            color: color(feature.geometry.coordinates[2]),
            fillColor: color(feature.geometry.coordinates[2]),
            fillOpacity: 0.5,
            radius: radius(feature.properties.mag)
        }).addTo(myMap);


        earthquakeDate = new Date(feature.properties.time);
        humanDateFormat = earthquakeDate.toLocaleString('en-US', {timeZoneName: 'short'});
        // ("en-US", {month: "long", day: 'numeric', year: 'numeric'});

        circle.bindPopup(`<b>Earthquake ID: </b> ${feature.id}<br>
                          <b>Magnitude: </b>${feature.properties.mag}<br>
                          <b>Location: </b> ${feature.properties.place}<br>
                          <b>Time: </b> ${humanDateFormat}`);

        
    });
    
    var legend = L.control({position: 'bottomright'});
        legend.onAdd = function(myMap) {
            var div = L.DomUtil.create('div', 'info legend'),
                grades = [-10, 10, 30, 50, 70, 90],
                labels = [];
            for (var i = 0; i < grades.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + color(grades[i] + 1) + '"></i> ' +
                    grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
                }
                return div;
        };
        legend.addTo(myMap);
    
});

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
