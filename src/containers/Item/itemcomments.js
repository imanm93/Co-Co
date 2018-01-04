import React, { Component } from 'react';
import Comment from '../../components/Comment';
import CommentForm from '../../components/CommentForm';

class ItemComments extends Component {

  render() {
    console.log(this.props.comments);
    return(
      <div>
        { this.props.comments && this.props.comments.map(comment => {
            return <Comment key={comment.timestamp} comment={comment} />
          })
        }
        <CommentForm onPostComment={this.props.onPostComment} />
      </div>
    )
  }

}

export default ItemComments;
