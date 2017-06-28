import React from 'react';

import ajax from 'superagent'

import { Link } from 'react-router';

import  { tech_radar_api_key } from "../../_config"

let TechTableRow = React.createClass({
    render(){
        return <tr>
            <td>{this.props.item.author}</td>
            <td><Link to={this.props.item.url}>
                {this.props.item.title}
            </Link></td>
        </tr>
    }

});

let TechTable = React.createClass({
    render(){
        var items = this.props.newsList.map(function(newsitem,index) {
            return <TechTableRow key={index} item={newsitem}  /> ;
        });
        return <table className="table-bordered table-condensed table-striped">
            <thead><tr><th>Author</th><th>Article</th></tr></thead>
            <tbody>{items}</tbody>
            <tfoot><tr><td colSpan="2"><Link to="https://newsapi.org/">
                Powered by NewsAPI.org
            </Link></td></tr></tfoot>
            </table>
    }

});

let TechNews = React.createClass({
    getInitialState() {
        return {
            newsList: []
        };
    },
    componentDidMount: function() {
        this.getAll();
    },
    getAll : function(){
        ajax.get('https://newsapi.org/v1/articles?source=techradar&apiKey=' + tech_radar_api_key )
            .then(response => {
                this.setState({
                    newsList: response.body.articles
                });
            });
    },
    render: function(){

        return (
            <div className="row">
                <div className="col-md-12">
                    <TechTable newsList={this.state.newsList}/>
                </div>
            </div>
        );
    }
});

export default TechNews;