import React,{ Component } from "react";
import ListItem from './listItem'

export default class VenueList extends Component {
    render(){
        return (
            <ol className="venueList">
                { this.props.venues && 
                    this.props.venues.map( (venue,idx) => (
                        <ListItem  key={idx} {...venue} handleListitemClick={this.props.handleListitemClick}/>
                    ))}
            </ol>
        );
    }
}