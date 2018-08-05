import React, { Component } from "react";
import MapContainer from "./MapContainer";
import Sidebar from "./Sidebar";
import places from '../places.json';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      sidebarStyle: {width: '0px'},
      fullContentStyle: {marginLeft: '0px'},
      selectedPlaces: places
    }

    this.handleQuery = this.handleQuery.bind(this);
  }

  // When filter clicked, gets the query and filters the places accordingly.
  handleQuery(query) {
    const selectedPlaces = places.filter(place => place.title.includes(query));
    this.setState({selectedPlaces});
  }

  // Provides functionality to hide or display the sidebar menu.
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

  render() {
    const { sidebarStyle, selectedPlaces } = this.state;
    return (
      <React.Fragment>
        <Sidebar
          sidebarStyle={sidebarStyle}
          selectedPlaces={selectedPlaces}
          handleViewSidebar={this.handleViewSidebar}
          handleSelectedMarker={this.handleSelectedMarker}
          handleQuery={this.handleQuery}
          />

        <div id="fullContent" style={this.state.fullContentStyle}>
          <span className="burgerIcon" onClick={() => this.handleViewSidebar(true)}>&#9776;</span>
          <div id="mapContent">
            <MapContainer 
              selectedPlaces={selectedPlaces}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}