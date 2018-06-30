mapboxgl.accessToken = mapboxToken;

// generate new Mapbox map and geocoder search bar
var map = new mapboxgl.Map({
        container: 'map',
        // style: 'mapbox://styles/scottammon/cjit4mrto3t7j2rmsf423fo2u',
        style: 'mapbox://styles/scottammon/cjj1uc93w0qet2rsa2lyooqxk',
        center: [-98, 38],
        zoom: 4
      });

      // Adds geocoding control bar on map to zoom to locations
      map.addControl(new MapboxGeocoder({
        accessToken: mapboxgl.accessToken
      }));

var markerArray = [];

// add all projects to map on main get route to '/map'
projects.forEach(function(project) {
  if(project.lng && project.lat) {
    var marker = new mapboxgl.Marker()
    .setLngLat([project.lng, project.lat])
    .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
    .setHTML("<a href='/projects/" + project.id + "'>" + project.title + "</a>"))
    .addTo(map);
   markerArray.push(marker);
  }
});

// hijack post route to reload map with new data based on selected tag
$(".filter-map").on('submit', function(e) {
  // prevent page refresh
  e.preventDefault();

  var newData = $(this).serialize();
  var url = $(this).attr('action');

  // async call to the server side post route, passing the current map state
  $.ajax({
    method: 'POST',
    url: url,
    data: newData
  }).done(function(data) {
    // server post route sends JSON data back with projects

    // remove markers from map
    markerArray.forEach(function(marker) {
      marker.remove();
    });

    // add markers for the filtered projects that were passed back
    data.projects.forEach(function(project) {
      if(project.lng && project.lat) {
       var marker = new mapboxgl.Marker()
        .setLngLat([project.lng, project.lat])
       .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
       .setHTML("<a href='/projects/" + project.id + "'>" + project.title + "</a>"))
       .addTo(map);
       markerArray.push(marker);
      }
    });
  });
});

