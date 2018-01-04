import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import moment from 'moment';

class Comment extends Component {

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <img style={{ width: '3rem', height: '3rem', borderRadius: '50%' }} src={this.props.comment.user.profilePhotoUrl} alt={'profile'} />
          </Grid.Column>
          <Grid.Column width={13}>
            <div>{this.props.comment.text}</div>
            <div><small>{moment(this.props.comment.timestamp).fromNow()}</small></div>
            { this.props.comment.error &&
              <div><small><b>{this.props.comment.error}</b><a onClick={() => this.props.onRetry(this.props.comment)}>retry?</a></small></div>
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

}

export default Comment;
