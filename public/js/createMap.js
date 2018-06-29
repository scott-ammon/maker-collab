mapboxgl.accessToken = mapboxToken;

var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/scottammon/cjit4mrto3t7j2rmsf423fo2u',
        center: mapCenter,
        zoom: mapZoom
      });

      // Adds geocoding control bar on map to zoom to locations
      map.addControl(new MapboxGeocoder({
        accessToken: mapboxgl.accessToken
      }));

var markerArray = [];

// hijack post route and add current map state to form data
$(".filter-map").on('submit', function(e) {
  e.preventDefault();

  console.log('map center:', map.getCenter());
  console.log('map zoom:', map.getZoom());

  var mapCenter = [map.getCenter().lng, map.getCenter().lat];
  var mapZoom = map.getZoom();

  // set the map center and zoom level in the form inputs before passing to server
  $(".map-center").attr('value', mapCenter);
  $(".map-zoom").attr('value', mapZoom);

  var newData = $(this).serialize();

  var url = $(this).attr('action');
    $.ajax({
      method: 'POST',
      url: url,
      data: newData
    }).done(function(data) {
      // window.location = '/map';
      var projects = data.projects;
      var mapCenter = data.mapC;
      var mapZoom = data.mapZ;
  
      mapCenter = mapCenter.split(',');
      mapCenter = mapCenter.map(num => parseInt(num));

      markerArray.forEach(function(marker) {
        marker.remove();
      });

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
    });
});

