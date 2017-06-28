import React from 'react';

var IssueTableControls = React.createClass({
    getInitialState : function() {
        return {
            query: ''
        } ;
    },
    handleQueryChange: function(e) {
        this.setState({query: e.target.value});
        this.props.searchHandler(e.target.value);
    },
    render: function(){
        return <span>
             <input type="text"
                    className="form-control" placeholder="Search Term"
                    value={this.state.query}
                    onChange={this.handleQueryChange}></input>
        </span>
    }
});

export default IssueTableControls;
