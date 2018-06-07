import React, { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [
      {
        "title": "Phoenix Park",
        "latitude": "53.355882",
        "longitude": "-6.329813"
      },
      {
        "title": "Guinness Storehouse",
        "latitude": "53.341874",
        "longitude": "-6.286709"
      },
      {
        "title": "Irish Museum of Modern Art",
        "latitude": "53.342917",
        "longitude": "-6.300048"
      },
      {
        "title": "St Stephens Green",
        "latitude": "53.338174",
        "longitude": "-6.259119"
      },
      {
        "title": "Dublin Zoo",
        "latitude": "53.356194",
        "longitude": "-6.305290"
      },
      {
        "title": "The National Wax Museum Plus",
        "latitude": "53.346586",
        "longitude": "-6.258788"
      },
      {
        "title": "Irish Whiskey Museum",
        "latitude": "53.344156",
        "longitude": "-6.259554"
      },
      {
        "title": "Christ Church Cathedral",
        "latitude": "53.343513",
        "longitude": "-6.271060"
      }
      ],
      map: "",
      markers: "",
      placeMarkers: ""
    };
}

componentDidMount() {
  // Connects the function initMap().
  window.initMap = this.initMap;
  // Loads the Google Map.
  loadMapJS("https://maps.googleapis.com/maps/api/js?AIzaSyAspWW46yJvv-_sLizrtQFhNFYzjRROa_s&v=3&callback=initMap");
}

initMap() {
  // Creates a new map - only center and zoom are required.
  map = new window.google.maps.Map(document.getElementById('map'), {
    center: {lat: 53.349805, lng: -6.260310},
    zoom: 13,
    styles: styles,
    mapTypeControl: false
  })

  var largeInfowindow = new window.google.maps.InfoWindow();

  // Uses the location array to create an array of markers on initialize.
  for (var i = 0; i < locations.length; i++) {
    // Gets the position from the location array.
    var position = locations[i].location;
    var title = locations[i].title;
    // Creates a marker per location, and put into markers array.
    var marker = new google.maps.Marker({
      position: position,
      title: title,
      animation: google.maps.Animation.DROP,
      icon: defaultIcon,
      id: i
    });
    // Pushes the marker to our array of markers.
    markers.push(marker);
    // Creates an onclick event to open the large infowindow at each marker.
    marker.addListener('click', function() {
      populateInfoWindow(this, largeInfowindow);
    });
  }