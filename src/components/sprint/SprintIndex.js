import React from 'react';
import SprintTable from './SprintTable'
import sprintAPI from '../../jsonserver_utils/sprints'
import issueAPI from '../../jsonserver_utils/issues'
import {getCurrentUser} from '../../firebase_utils/auth'
import newsAPI from '../../firebase_utils/news'

var SprintIndex = React.createClass({
    getInitialState() {
        return {
            sprintList: []
        };
    },
    componentDidMount: function() {
        this.getAll();
    },
    getAll : function(){
        sprintAPI.list()
            .then(response => {
                this.setState({
                    sprintList: response.body
                });
            });
    },
    addSprint : function(n,d,sd,ed) {
      sprintAPI.create(n,d,sd,ed)
            .then((response)=> {
                let newsLink = "/sprints/" + response.body.id;
                let newsText = response.body.description;
                let newsAuthor = getCurrentUser();
                let newsContent = " Created a new sprint ";
                newsAPI.postNews(newsAuthor,newsContent,newsLink,newsText);
                this.getAll();
      });
    },
    deleteSprint : function(id) {
        sprintAPI.listIssues(id)
            .then((response)=>{
                response.body.forEach(function(entry) {
                     console.log("delete issue" + entry.id)
                     issueAPI.loadComments(entry.id)
                         .then((r) =>{
                             r.body.forEach(function(comment) {
                                 issueAPI.deleteComment(comment.id).end()
                             })
                         }).then(sprintAPI.deleteIssue(entry.id))
                });
               return sprintAPI.delete(id)
            })
            .then( this.getAll  )

    },
    render: function(){

        return (
            <div className="row">
                <div className="col-md-10 col-md-offset-1">
                    <SprintTable sprints={this.state.sprintList} addHandler={this.addSprint} deleteHandler={this.deleteSprint}/>
                </div>
            </div>
        );
    }
});

export default SprintIndex;