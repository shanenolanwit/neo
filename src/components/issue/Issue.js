import React, { Component } from 'react';

import CommentList from '../comment/CommentList'
import CommentForm from '../comment/CommentForm'
import IssueDetails from './IssueDetails'
import newsAPI from '../../firebase_utils/news'
import {getCurrentUser} from '../../firebase_utils/auth'
import utilityAPI from '../../jsonserver_utils/common'
import issueAPI from '../../jsonserver_utils/issues'


class Issue extends Component {

    constructor(props){
        super(props);
        this.state = {issue: null, comments: [] };
    }

    componentDidMount() {
        this.load();
    }

    //TODO: Investigate why this stopped working -> foreign key works as int but not as string
    // load = () => {
    //     let iid = this.props.params.issueid;
    //     console.log("Loading issue by id: " + iid);
    //     ajax.get('http://localhost:3004/issues/' + iid + "?_embed=comments")
    //         .end((error, response) => {
    //                 if (!error && response) {
    //                     console.log(response.body)
    //                     console.log(response.body.comments)
    //                     this.setState({
    //                         issue: response.body
    //                     });
    //                 } else {
    //                     console.log('There was an error fetching data', error);
    //                 }
    //             }
    //         );
    // }

    load = () => {
       let iid = this.props.params.issueid;
       issueAPI.load(iid)
            .end((e,r)=>{
                issueAPI.loadComments(iid)
                    .end((ee,rr)=>{
                        this.setState({
                            issue: r.body,
                            comments: rr.body
                        })
                    })
                });

    };

    addComment = (comment,author) => {
            let iid = this.props.params.issueid;
            issueAPI.postComment(iid,author,comment)
            .then(response => {
                let newsLink = "/issues/" + iid;
                let newsText = "Go to issue";
                let newsAuthor = response.body.author;
                let newsContent = response.body.comment.substr(0,50) + " ...";
                console.log(newsAuthor + newsContent + " " + newsText + " " + newsLink);
                newsAPI.postNews(newsAuthor, "Added a comment", newsLink, newsContent);
                this.load();
            });

    }

    incrementUpvote = (id, count) => {
       issueAPI.upvote(id,count)
            .then( (res) => {
                    console.log("Comment patch complete - ready to refresh");
                    this.load()
                }

            );
    }

    updateDetail = (id,detail) => {
        console.log("patch detail for issue " + id + " -> " + detail);
            issueAPI.updateDetail(id,detail)
            .then( (res) => {
                console.log("detail patch complete - ready to refresh");
                    this.load()
                }
            );
    }

    updateDescription = (id,description) => {
        console.log("patch description for issue " + id + " -> " + description);
            issueAPI.updateDescription(id,description)
            .then( (res) => {
                    console.log("description patch complete - ready to refresh");
                    this.load()
                }
            );
    }

    updatePriority = (issue,inc) => {
        console.log("patch priority for issue " + issue.id);
            issueAPI.updatePriority(issue,inc)
            .then( (res) => {
                    console.log("priority patch complete - ready to refresh");
                    this.load()
                }
            );
    }

    updateWorkdays = (issue,inc) => {
        console.log("patch workdays for issue " + issue.id);
            issueAPI.updateWorkdays(issue,inc)
            .then( (res) => {
                    console.log("workdays patch complete - ready to refresh");
                    this.load()
                }
            );
    }

    updateStatus = (issue) => {
        var currentStatus = utilityAPI.convertToBoolean(issue.complete);
            issueAPI.updateStatus(issue,currentStatus)
            .then( (res) => {
                    let newsLink = "/issues/" + issue.id;
                    let newsLinkText = issue.description;
                    let newsAuthor = getCurrentUser();
                    let newsContent = currentStatus ? "Reopened Issue" : "Completed Issue";
                    console.log(newsLink + " " + newsLinkText + " " + getCurrentUser() + " " + newsContent);
                    newsAPI.postNews(newsAuthor, newsContent, newsLink, newsLinkText);
                    console.log("status patch complete - ready to refresh");
                    this.load()
                }
            );
    }

    render(){

        return (
            <div>
                {this.state.issue
                    ?  <div>
                        <IssueDetails issue={this.state.issue}
                                      updateDetailHandler={this.updateDetail}
                                      updateDescriptionHandler={this.updateDescription}
                                      updatePriorityHandler={this.updatePriority}
                                      updateWorkdaysHandler={this.updateWorkdays}
                                      updateCompleteStatusHandler={this.updateStatus}/>
                        <CommentList comments={this.state.comments} upvoteHandler={this.incrementUpvote} />
                        <CommentForm addCommentHandler={this.addComment} />
                    </div>
                    :   <div>

                        <p>Loadinng . . .</p>


                    </div>
                }

            </div>
        );
    }
};

export default Issue;