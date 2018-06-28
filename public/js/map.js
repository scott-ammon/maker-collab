mapboxgl.accessToken = mapboxToken;

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/scottammon/cjit4mrto3t7j2rmsf423fo2u',
  center: [-100, 38],
  zoom: 4
});

projects.forEach(function(project) {
	if(project.lng && project.lat) {
    var marker = new mapboxgl.Marker()
    .setLngLat([project.lng, project.lat])
    .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
    .setHTML("<a href='/projects/" + project.id + "'>" + project.title + "</a>"))
    .addTo(map);
  }
});

map.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
}));