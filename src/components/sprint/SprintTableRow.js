import React from 'react';
import Button from '../common/Button'
import { Link } from 'react-router';

var SprintTableRow = React.createClass({
    deleteSprint : function(e){
        this.props.deleteHandler( this.props.sprint.id )
    },
    render : function() {
        return (
            <tr>
                <td>
                    <Link to={'/sprints/' + this.props.sprint.id}>
                        {this.props.sprint.name}
                    </Link>
                </td>
                <td>{this.props.sprint.description}</td>
                <td>{this.props.sprint.start_date}</td>
                <td>{this.props.sprint.end_date}</td>
                <td><Button title="Delete" handleSubmit={this.deleteSprint} stylingRules="btn delete"/> </td>


            </tr>
        );
    }
});

export default SprintTableRow;