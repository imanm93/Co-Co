import React, { Component } from 'react';
import { Grid, Comment } from 'semantic-ui-react';
import CommentForm from '../../components/CommentForm';
import moment from 'moment';

class ItemComments extends Component {

  render() {
    return(
      <Grid.Column width={16}>
        <Grid.Row className='coandco-comments'>
          { this.props.comments && this.props.comments.map(comment => {
              return <Comment key={comment.timestamp}>
                <Comment.Avatar src={comment.user.profilePhotoUrl} />
                <Comment.Content>
                  <Comment.Author as='a'>{comment.user.name}</Comment.Author>
                  <Comment.Metadata>
                    <div>{moment(comment.timestamp).fromNow()}</div>
                  </Comment.Metadata>
                  <Comment.Text>{comment.text}</Comment.Text>
                </Comment.Content>
                <Comment.Actions>
                  { comment.error &&
                    <div>
                      <small><b>{comment.error}</b><a onClick={() => this.props.onRetry(comment)}>retry?</a></small>
                    </div>
                  }
                </Comment.Actions>
              </Comment>
            })
          }
        </Grid.Row>
        <Grid.Row>
          <CommentForm onPostComment={this.props.onPostComment} />
        </Grid.Row>
      </Grid.Column>
    )
  }

}

export default ItemComments;
