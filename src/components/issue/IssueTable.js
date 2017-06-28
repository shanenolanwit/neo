import React from 'react';
import IssueTableForm from './IssueTableForm'
import IssueTableRow from './IssueTableRow'
import _ from 'lodash';

var IssueTable = React.createClass({
    sortByDescription : function(){
        this.props.sortHandler("description")
    },
    sortByPriority : function(){
        this.props.sortHandler("priority")
    },
    sortByWorkdays : function(){
        this.props.sortHandler("workdays")
    },
    sortByComplete : function(){
        this.props.sortHandler("complete")
    },
    toggleOrder : function(){
        this.props.toggleOrder()
    },
    render: function(){
        var list = this.props.issues;
        var filteredList = list;
        if(this.props.sortBy.toLowerCase() === 'priority'){
            filteredList = list.sort(function(issueA,issueB){
                var result = 0;
                if(issueA.priority.toLowerCase() === 'low'){
                    result = (issueB.priority.toLowerCase() === 'medium' || issueB.priority.toLowerCase() === 'high' ) ? 1 : 0
                } else if(issueA.priority.toLowerCase() === 'medium'){
                    result = issueB.priority.toLowerCase() === 'low' ? -1 : (issueB.priority.toLowerCase() === 'high' ? 1 : 0)
                } else {
                    result = (issueB.priority.toLowerCase() === 'low' || issueB.priority.toLowerCase() === 'medium' ) ? -1 : 0
                }
                return result;
            });
        }
        else{
            filteredList = _.sortBy(list, this.props.sortBy) ;
        }
        if(!this.props.order){
            filteredList = filteredList.reverse();
        }
        let issues = filteredList.map(function(issue,index) {
            return <IssueTableRow key={index} issue={issue}
                             deleteHandler={this.props.deleteHandler}/> ;
        }.bind(this) )

        return (
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>DESCRIPTION <span className="glyphicon glyphicon-chevron-down pull-right" onClick={this.sortByDescription}></span></th>
                    <th>PRIORITY <span className="glyphicon glyphicon-chevron-down pull-right" onClick={this.sortByPriority}></span></th>
                    <th>WORKDAYS <span className="glyphicon glyphicon-chevron-down pull-right" onClick={this.sortByWorkdays}></span></th>
                    <th>COMPLETE <span className="glyphicon glyphicon-chevron-down pull-right" onClick={this.sortByComplete}></span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {issues}
                </tbody>
                <tfoot>
                <IssueTableForm addHandler={this.props.addHandler}/>
                </tfoot>
            </table>
        );
    }

});

export default IssueTable;