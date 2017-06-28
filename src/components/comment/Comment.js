import React, { Component } from 'react';

class Comment extends Component {

    handleVote = () => {
        console.log("/src/components/comment/Comment : handleVote ");
        this.props.upvoteHandler(this.props.comment.id, this.props.comment.upvotes);
    }
    render() {
        console.log("/src/components/comment/Comment : render");

        return (
            <div className="comment">
                <div className="row comment-header">
                    <div className="col-md-10">
                        <span className="glyphicon glyphicon-user"> </span><span className="author">{this.props.comment.author}</span>
                    </div>

                    <div className="col-md-2">
                        <span className="glyphicon glyphicon-thumbs-up pointer" onClick={this.handleVote}> </span>
                        <span className="upvotes">{this.props.comment.upvotes}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 comment-body">{this.props.comment.comment} </div>
                </div>
             </div>
    );
}

}

export default Comment;

