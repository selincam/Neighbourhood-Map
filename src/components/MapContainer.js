import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
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
    const { selectedPlaces } = this.props;
    let initialCenter = {};
    if (selectedPlaces[0]) {
      initialCenter = {
        lat: this.props.selectedPlaces[0].latitude,
        lng: this.props.selectedPlaces[0].longitude
      };
    }
    return (
      <Map
        initialCenter={initialCenter}
        google={this.props.google} 
        zoom={12}>

        {
          this.props.selectedPlaces.map((place, i) => (
            
            <Marker
              aria-label="Marker"
              key={i}
              onClick={this.onMarkerClick}
              title={place.title}
              description={place.description}
              formattedAddress={place.formattedAddress}
              position={{lat: place.latitude, lng: place.longitude}}
              animation={
                place.title === this.state.activeMarker.title ?
                this.props.google.maps.Animation.DROP : ''
              } />
          ))
        }

        <InfoWindow
          aria-label="Info Window"
          marker={this.state.activeMarker}
          onClose={this.onInfoWindowClose}
          visible={this.state.showingInfoWindow}>
          <div>
            <h4>{this.state.activeMarker.title}</h4>
            <p>{this.state.activeMarker.description}</p>
            <p>{this.state.activeMarker.formattedAddress}</p>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

const LoadingContainer = (props) => (
  <div>Loading Google Maps. If it takes more than 5 seconds, please check Javascript console for any errors.</div>
)

// Google's API Key
export default GoogleApiWrapper({
  apiKey: ("AIzaSyB868uN5xDP2HfMsvu08Z8-TZMR1t33-Tg"),
  LoadingContainer: LoadingContainer
})(MapContainer)