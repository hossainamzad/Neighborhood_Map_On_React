import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SideBar from './component/sideBar'
import Map from './component/map';
import  SquareAPI from './API/'

class App extends Component {

  constructor(){
    super();
    this.state = {
      venues: [],
      markers: [],
      center: [],
      zoom: 12,
      requestWasSuccessful:true,
      updateSuperState : obj =>{
        this.setState(obj);
      }
    }

  }

  closeAllMarkers = () =>{
    const markers = this.state.markers.map( marker =>{
      marker.isOpen = false;
      return marker;
    });

    this.setState({markers: Object.assign(this.state.markers,markers)});
  }

  handleMarkerClick = (marker) =>{
    this.closeAllMarkers();
    marker.isOpen = true;
    this.setState({markers : Object.assign(this.state.markers,marker)});
    const venue = this.state.venues.find( venue => venue.id === marker.id);

    SquareAPI.getVenueDetails(marker.id)
    .then(res =>{
      const newVenue = Object.assign(venue, res.response.venue);
      this.setState({venues : Object.assign(this.state.venues, newVenue)})
      // console.log(res);
      });
  }

  handleListitemClick = (venue)=>{
    const marker = this.state.markers.find(marker => marker.id === venue.id);
    this.handleMarkerClick(marker);
    // console.log(venue);
  }

  componentDidMount(){
    SquareAPI.search({
      near:'Queens,NY',
      query: 'tacos',
      limit: 10
    }).then( results => {
      const {venues } = results.response;
      const { center } = results.response.geocode.feature.geometry;
      const markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          isOpen: false,
          isVisible: true,
          id: venue.id
        };
      });
      this.setState({ venues, center, markers });
      console.log(results);
    }).catch(function(res) {
      alert('Error in fetching data');
      console.log("error");
  });
  }

componentWillReceiveProps({isScriptLoadSucceed}){
  alert(isScriptLoadSucceed);
  if (!isScriptLoadSucceed) {
    console.log("google maps API couldn't load.");
    this.setState({requestWasSuccessful: false})
  }

}


  render() {
    const {requestWasSuccessful} = this.state;
    return (
      requestWasSuccessful ? (
        <div className="App">
          <SideBar {...this.state}
              handleListitemClick={this.handleListitemClick}/>
          <Map role="application" aria-label="googleMap" {...this.state}
              handleMarkerClick = {this.handleMarkerClick} />
        </div>
        ) : (
          <div>
          <h1>loading map's api was unsuccessful. please try again later</h1>
        </div>
        )
    );
  }
}

export default App;
