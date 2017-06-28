import React from 'react';
import Button from '../common/Button'

var IssueTableForm = React.createClass({
    getInitialState: function() {
        return { description: '', priority: 'Low', workdays: '1'};
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var description = this.state.description.trim();
        var priority = this.state.priority.trim();
        var workdays = this.state.workdays.trim();
        if (!description || !priority || !workdays) {
            return;
        }
        this.props.addHandler(description,priority,workdays);
        this.setState({ description : '', priority : 'Low', workdays: '1'} );

    },
    handleDescriptionChange: function(e) {
        this.setState({description: e.target.value});
    },
    handlePriorityChange: function(e) {
        this.setState({priority: e.target.value});
    },
    handleWorkdaysChange: function(e) {
        this.setState({workdays: e.target.value});
    },
    handleCompleteChange: function(e) {
        this.setState({complete: e.target.value});
    },
    render : function() {
        return (
            <tr>

                <td>
                    <input type="text"
                           className="form-control" placeholder="Name or description of issue"
                           value={this.state.description}
                           onChange={this.handleDescriptionChange}>
                    </input>
                </td>
                <td>
                    <select className="form-control" value={this.state.priority} onChange={this.handlePriorityChange}>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>

                    </select>
                </td>
                <td>
                    <input className="form-control" type="number" placeholder="Working Days to Complete"
                           min="1" max="10" value={this.state.workdays}
                           onChange={this.handleWorkdaysChange}/>
                </td>
                <td>
                    <select disabled className="form-control" value={this.state.complete}>
                        <option value="false">Not yet completed</option>
                    </select>
                </td>
                <td>
                    <Button title="Post" handleSubmit={this.handleSubmit} stylingRules="btn post"/>
                </td>

            </tr>
        )

    }
});

export default IssueTableForm;