import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class LIST1 extends Component {
    constructor(props) {
        super(props);   
    }

    sendData(e){
        this.props.parentCallback(e);
   }

    render() {
        return this.props.party.map (   
            (object, i) => {
            return (
                <li className="list-group-item" key={i} id={i} onClick={() => this.sendData(object.partycde)} value={object.partycde} >
                    <div className="todo-indicator bg-primary"></div>
                    <div className="widget-content p-0">
                        <div className="widget-content-wrapper">
                            <div className="widget-content-left flex2">
                                <div className="widget-heading"> {object.partycde} - {object.partytyp} </div>
                                <div className="widget-subheading">{object.prtyname} </div>
                                <div className="widget-subheading">{object.addr} </div>
                            </div>
                            <div className="widget-content-right ml-3">
                                <div className="badge badge-pill badge-success">{object.phonenum}</div>
                            </div>
                        </div>
                    </div>
                </li>
            )
        })
    }
}

export default LIST1;