import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';

class ItemControls extends Component {

  render() {
    return(
      <Grid.Row style={{ paddingTop: 0, paddingBottom: 0, backgroundColor: '#F1F1F1', borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', textAlign: 'left' }}>
        <Grid.Column width={12}>
          <Button className='item-btn-control' style={{ paddingLeft: 0 }} onClick={() => this.props.onLike()}>
            { this.props.isLiked &&
                <i className="fa fa-heart" aria-hidden="true"></i>
            }
            {
              !this.props.isLiked &&
                <i className="fa fa-heart-o" aria-hidden="true"></i>
            }
            <span>{this.props.numberOfLikes}</span> Likes
          </Button>
          <Button className='item-btn-control' onClick={() => this.props.onComments()}><i className="fa fa-comment" aria-hidden="true"></i> <span>{this.props.numberOfComments}</span> Comments</Button>
          { this.props.type === "event" &&
              <Button className='item-btn-control' onClick={() => this.props.onInterested()}><i className="fa fa-check" aria-hidden="true"></i> Interested(<span>{this.props.numberGoing} are going</span>)</Button>
          }
          { this.props.type === "opportunity" &&
              <Button className='item-btn-control' onClick={() => this.props.onEnquire()}>Enquire</Button>
          }
        </Grid.Column>
        <Grid.Column width={4} style={{ textAlign: 'right' }}>
          { this.props.userId === this.props.itemUserId &&
              <Button className='item-btn-control' onClick={() => this.props.onDelete()}>Delete</Button>
          }
        </Grid.Column>
      </Grid.Row>
    )
  }

}

export default ItemControls;
