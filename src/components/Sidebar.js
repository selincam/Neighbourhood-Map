import React, { Component } from "react";

export default class Sidebar extends Component {
  constructor() {
    super();

    this.state = {
      query: ''
    }

    this.onChangeQuery = this.onChangeQuery.bind(this);
  }

  // Updates prompted query.
  onChangeQuery(event) {
    var query = event.target.value;
    this.setState({query});
  }

  // Filters places according to the given query.
  filterPlaces = () => {
    const { query } = this.state;
    this.props.handleQuery(query);
  }

  // Lists all places and provides search functionality.
  render() {
    const { selectedPlaces, sidebarStyle } = this.props;

    return (
    <div id="left-sidebar" className="sidenav" style={sidebarStyle}>
      <a href="javascript:void(0)" className="closebtn" onClick={() => this.props.handleViewSidebar(false)}>&times;</a>
      <input className="search" type="text" placeholder="Search" onChange={this.onChangeQuery} />
      <button className="filterButton" type="button" onClick={() => this.filterPlaces()}>Filter</button>
      {
        selectedPlaces.map((place, id) => (
          <a href="javascript:void(0)" key={id} aria-label="Place">{place.title}</a>
        ))
      }
    </div>)
  }
}