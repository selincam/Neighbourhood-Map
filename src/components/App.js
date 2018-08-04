import React, { Component } from "react";
import MapContainer from "./MapContainer";

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

  render() {
    return (
      <React.Fragment>
        <div id="left-sidebar" className="sidenav" style={this.state.sidebarStyle}>
          <a href="javascript:void(0)" className="closebtn" onClick={() => this.handleViewSidebar(false)}>&times;</a>
          <a href="#">Contact</a>
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