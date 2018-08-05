import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import places from '../places.json';

class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onInfoWindowClose = this.onInfoWindowClose.bind(this);

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
  }

  onMarkerClick(props, marker) {
    this.setState({
      showingInfoWindow: true,
      activeMarker: marker,
      selectedPlace: props
    });
  }

  onInfoWindowClose() {
    this.setState({
      showingInfoWindow: false
    });
  }

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
          places.map((place, i) => (
            <Marker
              key={i}
              onClick={this.onMarkerClick}
              name={place.title}
              position={{lat: place.latitude, lng: place.longitude}} />
          ))
        }

        <InfoWindow 
          marker={this.state.activeMarker}
          onClose={this.onInfoWindowClose}
          visible={this.state.showingInfoWindow}>
          <div>
            <h3>{this.state.activeMarker.name}</h3>
            <h4>{this.state.activeMarker.description}</h4>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyAspWW46yJvv-_sLizrtQFhNFYzjRROa_s")
})(MapContainer)