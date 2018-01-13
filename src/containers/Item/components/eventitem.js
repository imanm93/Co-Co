import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import styles from './eventitem.css';
import moment from 'moment';

class EventItem extends Component {

  render() {
    const month = ["Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    return (
      <Grid.Row style={{ paddingBottom: 0, paddingTop: 0, textAlign: 'left' }}>
        <Grid.Column width={7} style={{
          backgroundImage: this.props.item.photoUrl ? 'url(https://n6-img-fp.akamaized.net/free-photo/pink-wooden-surface-with-decorative-twigs_23-2147600605.jpg?size=338&ext=jpg)' : 'url(' + this.props.item.photoUrl + ')',
          borderTopLeftRadius: '5px',
          objectFit: 'cover'
        }}>
          <div className='event-date-and-cost'>
            <div className='event-date'>
              <div className='event-date-number'>{ moment(this.props.item.startDateTime).date() }</div>
              <div className='event-date-month'>{ month[moment(this.props.item.startDateTime).month()] }</div>
            </div>
            <div className='event-cost'>{ this.props.item.cost ? 'Paid' : 'Free' }</div>
          </div>
        </Grid.Column>
        <Grid.Column width={9} style={{ padding: 0, backgroundColor: '#FFF', borderTopRightRadius: '5px', }}>
          <div className='event-title'>{this.props.item.title}</div>
          <div className='event-posted-by'>Posted by: <b className='event-posted-by-name'>{this.props.item.user.name}</b><span className='event-posted-time'>{this.props.item.displayDateTime}</span></div>
          <div className='event-attributes'>
            <div className='event-attribute'><i className="fa fa-hashtag" aria-hidden="true"></i> {this.props.item.type}</div>
            <div className='event-attribute'><i className='fa fa-clock-o' aria-hidden="true"></i>{moment(this.props.item.startDateTime).format("LLL")}</div>
            <div className='event-attribute'><i className="fa fa-map-marker" aria-hidden="true"></i> {this.props.item.location}</div>
          </div>
          <div className='item-dotted-line'></div>
          { !this.props.item.expanded &&
              <div className='event-see-more'><Button className='item-btn-see-more' onClick={() => this.props.onExpand(this.props.type, this.props.item.itemId)}>See More <i className="fa fa-chevron-down" aria-hidden="true"></i></Button></div>
          }
          { this.props.item.expanded &&
              <div className='event-description'>{this.props.item.description}</div>
          }
        </Grid.Column>
      </Grid.Row>
    )
  }

}

// <div>
//   {this.props.item.topics && this.props.item.topics.map(topic => (<span key={this.props.item.itemId + topic}>#{topic}</span>))}
// </div>

export default EventItem;
