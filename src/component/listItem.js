import React,{ Component } from "react";

export default class ListItem extends Component{
    render(){
        return(
            <li className="listItem" tabIndex="1" onClick={()=> this.props.handleListitemClick(this.props)}>
                <img src={`${this.props.categories[0].icon.prefix}32${this.props.categories[0].icon.suffix}`} 
                    alt={this.props.categories.alt}/>
                {this.props.name}
            </li>
        )
    }
}