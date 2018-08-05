import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import places from '../places.json';

class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
  }

  // It opens info window related with the chosen marker.
  onMarkerClick(props, marker) {
    this.setState({
      showingInfoWindow: true,
      activeMarker: marker,
      selectedPlace: props
    });
  }

  // It closes open info window.
  onInfoWindowClose() {
    this.setState({
      showingInfoWindow: false,
      activeMarker: {}
    });
  }

  // Shows the map and lists filtered places on map.
  render() {
    let initialCenter = {
      lat: places[0].latitude,
      lng: places[0].longitude
    };
    return (
      <Map
        initialCenter={
          initialCenter
        }
        google={this.props.google} 
        zoom={12}>

        {
          this.props.selectedPlaces.map((place, i) => (
            
            <Marker
              key={i}
              onClick={this.onMarkerClick}
              title={place.title}
              description={place.description}
              position={{lat: place.latitude, lng: place.longitude}}
              animation={
                place.title === this.state.activeMarker.title ?
                this.props.google.maps.Animation.DROP : ''
              } />
          ))
        }

        <InfoWindow 
          marker={this.state.activeMarker}
          onClose={this.onInfoWindowClose}
          visible={this.state.showingInfoWindow}>
          <div>
            <h3>{this.state.activeMarker.title}</h3>
            <h4>{this.state.activeMarker.description}</h4>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

// Google's API Key
export default GoogleApiWrapper({
  apiKey: ("AIzaSyB868uN5xDP2HfMsvu08Z8-TZMR1t33-Tg")
})(MapContainer)