import React, { Component } from "react";
import MapContainer from "./MapContainer";
import Sidebar from "./Sidebar";
import places from '../places.json';

const CLIENT_ID = "LTXLHYWBPC0VWCIO1RRKHD213U14ODDRZLLV20IDK0YROT53";
const CLIENT_SECRET = "QMTZCKC5NCG5TA3WRGTSNUFYW2XNUNSUVKIZWZEHZG3KLC0T";
const FS_VERSION = "20180323";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      sidebarStyle: {width: '0px'},
      fullContentStyle: {marginLeft: '0px'},
      selectedPlaces: places,
      allPlaces: places,
    }

    this.handleQuery = this.handleQuery.bind(this);
  }

  componentDidMount() {
    const static_data = "client_id=" + CLIENT_ID +
               "&client_secret=" + CLIENT_SECRET +
               "&v=" + FS_VERSION +
               "&limit=1";
    const { allPlaces } = this.state;
    let errors = [];
    allPlaces.map((place, id) => {
      const data = static_data + "&ll=" + place.latitude + "," + place.longitude;
      fetch("https://api.foursquare.com/v2/venues/explore?" + data)
      .then(res => res.json())
      .then(
        (result) => {
          if (result.response && result.response.groups) {
            allPlaces[id].formattedAddress = result.response.groups[0].items[0].venue.location.formattedAddress.join(", ");
            this.setState({allPlaces});
          } else {
            errors.push("FourSquare API has not successfully returned full address of the venue:" + place.title + "\n");
          }
        },
        // Show error message to user.
        (error) => {
          errors.push("An error occurred reading from FourSquare API for the venue:" + place.title + "\n");
        }
      );
    });

    setTimeout(function(){ 
      if (errors !== undefined && errors.length > 0) {
        window.alert(errors.toString().replace(new RegExp(',', 'g'), '')); 
      }
    }, 3000);
  }

  // When filter clicked, gets the query and filters the places accordingly.
  handleQuery(query) {
    const selectedPlaces = this.state.allPlaces.filter(place => place.title.includes(query));
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
          aria-label="Side Menu"
          sidebarStyle={sidebarStyle}
          selectedPlaces={selectedPlaces}
          handleViewSidebar={this.handleViewSidebar}
          handleSelectedMarker={this.handleSelectedMarker}
          handleQuery={this.handleQuery}
          />

        <div id="fullContent" style={this.state.fullContentStyle}>
          <span className="burgerIcon" 
            tabIndex="1"
            onClick={() => this.handleViewSidebar(true)}>&#9776;</span>
          <div id="mapContent">
            <MapContainer
              aria-label="Map Container"
              selectedPlaces={selectedPlaces}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}