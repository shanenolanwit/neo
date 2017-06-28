import React from 'react';
import SprintTableRow from './SprintTableRow'
import SprintTableForm from './SprintTableForm'

var SprintTable = React.createClass({
    render : function() {
        console.log(this.props.sprints);
        var sprints = this.props.sprints.map(function(sprint,index) {
            return <SprintTableRow key={index} sprint={sprint} deleteHandler={this.props.deleteHandler}/> ;
        }.bind(this) )
        return (
            <table className="table table-bordered sprint-table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {sprints}
                </tbody>
                <tfoot>
                <SprintTableForm addHandler={this.props.addHandler}/>
                </tfoot>
            </table>
        );
    }

});

export default SprintTable;