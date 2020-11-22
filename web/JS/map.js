var map;
var service;
var infowindow;
var infowindowOpened;
var radius;
var type;
var isOpen = false;

function initMap(myRadius, myType) {
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
      const marker = createMarker(result[0], false, undefined); //potentially this could be 'you are here!' marker
      const latitude = result[0].geometry.location.lat();
      const longitude = result[0].geometry.location.lng();
      const place = {
        location: new google.maps.LatLng(latitude, longitude),
        radius: isOpen ? myRadius : 1000,
        type: myType,
      };
      map.setCenter(result[0].geometry.location);
      var circle = new google.maps.Circle({
        map: map,
        radius: isOpen ? myRadius : 1000,
        fillColor: "#b3b3ba",
      });
      circle.bindTo("center", marker, "position");
      if (isOpen) {
        findAccessPoints(place);
      }
    }
  });
}
const showMarkerBtn = document.getElementById("showMarkerBtn");
showMarkerBtn.addEventListener("click", (e) => {
  radius = document.getElementById("radius").value;
  if (!radius || !type) {
    alert("Please select type and radius.");
  } else {
    isOpen = true;
    initMap(parseInt(radius), type);
  }
});

function findAccessPoints(place) {
  service.nearbySearch(place, (results) => {
    for (let i = 0; i < results.length; i++) {
      parseAP(results[i]);
    }
  });
}

function parseAP(accessPoint) {
  const name = accessPoint.name;
  const rating = accessPoint.rating;
  const address = accessPoint.vicinity;
  const types = accessPoint.types;
  let contentString = `<div id="infowindow">`;
  if (name != undefined) {
    contentString += `<h2> Name: ${name} </h2>`;
  }
  if (rating != undefined) {
    contentString += `<br> <b>Rating: ${rating}</b>`;
  }
  if (address != undefined) {
    contentString += `<br> <b>Address: ${address}</b>`;
  }
  if (types != undefined) {
    contentString += `<br> <b>Types of interest:</b> `;
    types.forEach((type) => {
      contentString += ` <br>-${String(type)} `;
    });
  }
  contentString += "</div>";
  const infowindow = new google.maps.InfoWindow({
    content: contentString,
  });
  createMarker(accessPoint, true, infowindow);
}

function createMarker(accessPoint, display, infowindow) {
  const latitude = accessPoint.geometry.location.lat();
  const longitude = accessPoint.geometry.location.lng();
  const title = accessPoint.name;
  let marker = undefined; //will be for sure initialized
  if (display) {
    var icon = {
      url: String(accessPoint.icon), // url
      scaledSize: new google.maps.Size(30, 30), // scaled size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(0, 0), // anchor
    };
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(latitude, longitude),
      map: map,
      title: title,
      icon: icon,
    });
  } else {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(latitude, longitude),
      map: map,
      title: title,
    });
  }
  if (infowindow) {
    marker.addListener("click", () => {
      if (infowindowOpened) {
        infowindowOpened.close();
      }
      infowindow.open(map, marker);
      infowindowOpened = infowindow;
    });
  }
  return marker;
}

function setMarkerType(event) {
  const parent = event.parentNode.parentNode;
  type = event.innerHTML.toLowerCase();
  for (let i = 1; i < parent.childNodes.length; i += 2) {
    parent.childNodes[i].firstChild.style.color = "#9ba4b4";
  }
  event.style.color = "#ebebeb";
}

const returnBtn = document.getElementById("returnBtn");
returnBtn.addEventListener("click", () => {
  window.location.assign("/home");
});
