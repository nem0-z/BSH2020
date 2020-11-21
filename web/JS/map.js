var map;
var service;
var infowindow;
var markersArray = [];

function initMap() {
  infowindow = new google.maps.InfoWindow();

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
  });

  var request = {
    query: "stupine",
    fields: ["name", "geometry"],
  };

  service = new google.maps.places.PlacesService(map);
  service.findPlaceFromQuery(request, function (result, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      const marker = createMarker(result[0]); //potentially this could be 'you are here!' marker
      const latitude = result[0].geometry.location.lat();
      const longitude = result[0].geometry.location.lng();
      const place = {
        location: new google.maps.LatLng(latitude, longitude),
        radius: 1000,
        type: ["cafe"],
        //name: 'genelec'
      };
      map.setCenter(result[0].geometry.location);
      var circle = new google.maps.Circle({
        map: map,
        radius: 1000,
        fillColor: "#b3b3ba",
      });
      circle.bindTo("center", marker, "position");
      findAccessPoints(place);
    }
  });
}

function findAccessPoints(place) {
  service.nearbySearch(place, (results) => {
    for (let i = 0; i < results.length; i++) {
      createMarker(results[i]);
      //   console.log(results[i]);
    }
  });
}

function createMarker(accessPoint) {
  const latitude = accessPoint.geometry.location.lat();
  const longitude = accessPoint.geometry.location.lng();
  const title = accessPoint.name;
  var icon = {
    url: accessPoint.icon, // url
    scaledSize: new google.maps.Size(30, 30), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    anchor: new google.maps.Point(0, 0), // anchor
  };
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(latitude, longitude),
    map: map,
    title: title,
    icon: icon,
  });
  const request = {
    placeId: accessPoint.place_id,
    fields: [
      "name",
      "rating",
      "formatted_phone_number",
      "opening_hours.weekday_text",
    ],
  };
  service.getDetails(request, (place, status) => {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      try {
        const name = place.name;
        const opening_hours = place.opening_hours.weekday_text;
        const rating = place.rating;
        const phone_number = place.phone_num;
      } catch (err) {
        console.log(err);
      }
    }
  });
  return marker;
}

function setMarkerType(event) {
  return event.innerHTML.toLowerCase();
}

const showMarkerBtn = document.getElementById("showMarkerBtn");

showMarkerBtn.addEventListener("click", (e) => {
  const radius = document.getElementById("radius").value;

  // call your function
});
