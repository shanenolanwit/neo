import React from 'react';
import { Link } from 'react-router';
import * as constants from './firebase_utils/constants';

var SprintLink = React.createClass({
    render : function() {
        var title = this.props.title;
        return (
            <div>
                <span className="glyphicon glyphicon-thumbs-up">
                </span>
                <Link to={'/manage/sprint/' + this.props.sprint.id}>{this.props.sprint.id + " - " + this.props.sprint.description}</Link>

            </div>
        );
    }
})

var SprintList = React.createClass({
    render : function() {
        console.log(this.props.sprints);
        var sprints = this.props.sprints.map(function(sprint,index) {
            return <SprintLink key={index} sprint={sprint}/> ;
        }.bind(this) )
        return (
            <div>
                {sprints}
            </div>
        );
    }

});

var Manage = React.createClass({
    getInitialState() {
        return {
            sprintList: []
        };
    },
    componentDidMount: function() {
        var self = this;
        var sprints = constants.ref.child('sprints');
        sprints.once('value', snapshot=>  {
            return snapshot.val();
        }).then(function(sprints) {
            console.log(sprints.val());
            var sprintArray = []
            for(var id in sprints.val()){
                var sprint = sprints.val()[id];
                sprint['id'] = id;
                console.log(sprint);
                sprintArray.push(sprint);
            }
            self.setState({
                sprintList: sprintArray
            });
            return sprintArray;
        }, function(error) {
            // Something went wrong.
            console.error(error);
        });
    } ,
    render: function(){
        //var sprints = [{title: "0.0.1.0"},{title: "0.0.2.0"}];
        var defaultMessage = "Management"
        return (
            <div >
                <h3>{defaultMessage} </h3>
                <SprintList sprints={this.state.sprintList}/>
                <button>CREATE NEW SPRINT</button>
            </div>
        );
    }
});

export default Manage;