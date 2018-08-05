import React, { Component } from "react";
import MapContainer from "./MapContainer";
import places from '../places.json';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      sidebarStyle: {width: '0px'},
      fullContentStyle: {marginLeft: '0px'}
    }
  }

  handleViewSidebar = (shouldBeDisplayed) => {
    if (shouldBeDisplayed) {
      this.setState({
        sidebarStyle: {width: '250px'},
        fullContentStyle: {marginLeft: '250px'}
    });
    } else if (!shouldBeDisplayed) {
      this.setState({
        sidebarStyle: {width: '0px'},
        fullContentStyle: {marginLeft: '0px'}
      });
    }
  }

  filterPlaces = () => {
    // TODO: Get query and filter places
    console.log("Filter button clicked!");
  }

  handleSelectedMarker = (marker, id) => {
    // TODO: Center the map according to that marker and show info window
    console.log("Title= " + marker.title + " id= " + id);
  }

  render() {
    return (
      <React.Fragment>
        <div id="left-sidebar" className="sidenav" style={this.state.sidebarStyle}>
          <a href="javascript:void(0)" className="closebtn" onClick={() => this.handleViewSidebar(false)}>&times;</a>
          <input type="text" placeholder="Search" />
          <button type="button" onClick={() => this.filterPlaces()}>Filter</button>
          {
            places.map((place, id) => (
              <a href="javascript:void(0)" key={id} onClick={() => this.handleSelectedMarker(place, id)}>{place.title}</a>
            ))
          }
          
        </div>
        
        <div id="fullContent" style={this.state.fullContentStyle}>
          <span className="burgerIcon" onClick={() => this.handleViewSidebar(true)}>&#9776;</span>
          <div id="mapContent">
            <MapContainer />
          </div>
        </div>
      </React.Fragment>
    );
  }
}