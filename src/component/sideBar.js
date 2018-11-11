import React, { Component } from "react";
import VenueList from './venueList'

export default class SideBar extends Component {

    constructor(){
        super();
        this.state = {
            term:'',
            venues: []
        };
    }

    filterVenueHandler = () =>{
        if(this.state.term.trim() !== ""){
            const venues = this.props.venues.filter(venue => venue.name.toLowerCase()
            .includes(this.state.term.toLocaleLowerCase()));
            return venues;
        }
        return this.props.venues;
    }

    changehandler = (e) =>{

        this.setState({ term: e.target.value});
        const markers = this.props.venues.map( venue => {
            const isMatching = venue.name.toLowerCase().includes(e.target.value.toLowerCase());
            const marker = this.props.markers.find( marker => marker.id === venue.id);
            if(isMatching){
                marker.isVisible = true;
            }else{
                marker.isVisible = false;
            }
            return marker;
        });

        this.props.updateSuperState({markers});
    }

    render(){
        return (
            <aside className="sideBar">
                <input type={"search"} id={"search"}  placeholder={"Filter Venues"} onChange={this.changehandler}/>
                <VenueList {...this.props}
                    venues={this.filterVenueHandler()}
                    handleListitemClick={this.props.handleListitemClick}/>
            </aside>
        );
    }
}
