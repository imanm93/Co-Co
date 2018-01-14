import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';

class ItemControls extends Component {

  render() {
    return(
      <Grid.Row style={{ padding: '0.25em', backgroundColor: '#F1F1F1', borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', textAlign: 'left' }}>
        <Grid.Column width={12}>
          <Button className='item-btn-control' style={{ paddingLeft: 0 }} onClick={() => this.props.onLike()}>
            { this.props.isLiked &&
                <i className="fa fa-heart" aria-hidden="true"></i>
            }
            {
              !this.props.isLiked &&
                <i className="fa fa-heart-o" aria-hidden="true"></i>
            }
            <span>{this.props.numberOfLikes}</span> <span style={{ textDecoration: 'underline' }}>Likes</span>
          </Button>
          <Button className='item-btn-control' onClick={() => this.props.onComments()}>
            <i className="fa fa-comment" aria-hidden="true"></i>
            <span>{this.props.numberOfComments}</span> <span style={{ textDecoration: 'underline' }}>Comments</span>
          </Button>
          { this.props.type === "event" && this.props.going &&
              <Button className='item-btn-control' onClick={() => this.props.onInterested()}>
                <i className="fa fa-check" aria-hidden="true"></i>
                <span style={{ textDecoration: 'underline' }}>Interested</span> <span style={{ textDecoration: 'none' }}>({this.props.numberGoing} going)</span>
              </Button>
          }
          { this.props.type === "event" && !this.props.going &&
              <Button className='item-btn-control' onClick={() => this.props.onInterested()}>
                <i className="fa fa-check" aria-hidden="true"></i>
                <span style={{ textDecoration: 'underline' }}>Not Interested</span> <span style={{ textDecoration: 'none' }}>({this.props.numberGoing} going)</span>
              </Button>
          }
          { this.props.type === "opportunity" &&
              <a className='item-btn-control' href={'mailto:' + this.props.email}>
                <i className="fa fa-envelope" aria-hidden="true"></i>
                <span style={{ textDecoration: 'underline', fontWeight: 600 }}>Enquire</span>
              </a>
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
