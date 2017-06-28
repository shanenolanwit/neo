import React from 'react';
import utilityAPI from '../../jsonserver_utils/common'
import { Link } from 'react-router';


var NewsItem = React.createClass({

    render: function(){

        let datestring = utilityAPI.timestampToDateString(this.props.item.timestamp);


        return <li className="news-list-item">
            <span className="prop datestring">{datestring}</span>
            <span className="prop">{this.props.item.author + ' ' + this.props.item.message} </span><span><Link to={this.props.item.link}>{this.props.item.link_text}</Link>
                </span>
        </li>
    }
})

export default NewsItem;

