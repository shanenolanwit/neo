import React, { Component } from 'react';
import Comment from './Comment'

class CommentList extends Component {

    render() {
        console.log("/src/components/comment/CommentList : sort by upvotes and render");

        let items = this.props.comments.sort(function(a,b){ return b.upvotes - a.upvotes }).map(function(comment,index) {
            return <Comment key={index} comment={comment}
                       upvoteHandler={this.props.upvoteHandler}  /> ;
        }.bind(this) )
        return (

                <div className="row">
                    <div className="col-md-6 col-md-offset-3 comment-list">
                        {items}
                    </div>
                    <div className="col-md-3"></div>
                </div>


        );
    }

}

export default CommentList;
