import React, { Component } from 'react';
import {getCurrentUser} from '../../firebase_utils/auth'
import Button from '../common/Button'

class CommentForm extends Component {

    constructor(){
       super();
       var user = getCurrentUser();
       this.state = {content: "", author: user};
    }

    handleContentChange = (e) => {
        this.setState({content: e.target.value});
    }

    handleAuthorChange = (e) => {
        this.setState({author: e.target.value});
    }

    addComment = () => {
        this.props.addCommentHandler(this.state.content,this.state.author);
        this.setState({content: "",author: getCurrentUser()});
    }

    render() {

        return (
        <div className="row">
            <div className="col-md-6 col-md-offset-3 comment-list">
                <textarea rows="10"
                       className="form-control comment-input" placeholder="Comment - keep it short and sweet"
                       value={this.state.content}
                       onChange={this.handleContentChange}>
                </textarea>
                <input type="text"
                       className="form-control author-input pull-right" placeholder="Name or email"
                       value={this.state.author}
                       onChange={this.handleAuthorChange}>
                </input>
                <Button title="Add Comment" stylingRules="pull-right" handleSubmit={this.addComment} />

            </div>
            <div className="col-md-3"></div>
        </div>


        );
    }

}

export default CommentForm;
