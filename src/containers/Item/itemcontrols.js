import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

class ItemControls extends Component {

  render() {
    return(
      <div>
        <Button onClick={() => this.props.onLike(this.props.id)}><span>{this.props.numberOfLikes}</span> Likes</Button>
        <Button onClick={() => this.props.onComments(this.props.id)}><span>{this.props.numberOfComments}</span> Comments</Button>
        { this.props.type === "event" &&
            <Button onClick={() => this.props.onInterested(this.props.id)}>Interested</Button>
        }
        { this.props.type === "opportunity" &&
            <Button onClick={() => this.props.onEnquire(this.props.id)}>Enquire</Button>
        }
      </div>
    )
  }

}

export default ItemControls;
