import React from 'react';
import { Link } from 'react-router';
import Button from '../common/Button';

import utilityAPI from '../../jsonserver_utils/common';

var IssueTableRow = React.createClass({

    deleteIssue : function(e){
        this.props.deleteHandler( this.props.issue.id )
    },
    render: function(){
        var completionStyle = utilityAPI.convertToBoolean(this.props.issue.complete)  ? "low" : "high" ;
        var priorityStyle = this.props.issue.priority.toLowerCase();
        var workdaysStyle = this.props.issue.workdays < 4 ? "low" : this.props.issue.workdays > 6 ? "high" : "medium" ;
        return <tr>
              <td>
                  <Link to={'/issues/' + this.props.issue.id}>{this.props.issue.description}</Link>
              </td>
            <td className={priorityStyle}>
                {this.props.issue.priority}
            </td>
            <td className={workdaysStyle}>{this.props.issue.workdays}</td>
            <td className={completionStyle}>{utilityAPI.convertToBoolean(this.props.issue.complete) ? "Complete" : "Not Complete"}</td>
            <td> <Button title="Delete" handleSubmit={this.deleteIssue} stylingRules="btn delete"/></td>

        </tr>
    }
});

export default IssueTableRow;