import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import moment from 'moment';

class EventItemNotExpanded extends Component {

  render() {
    const month = ["Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    return(
      <Grid style={{ margin: 0 }}>
        <Grid.Column width={7} style={{
          borderTopLeftRadius: '5px',
          padding: 0
        }}>
          <img className='event-image' src={this.props.item.photoUrl ? this.props.item.photoUrl : 'https://n6-img-fp.akamaized.net/free-photo/pink-wooden-surface-with-decorative-twigs_23-2147600605.jpg?size=338&ext=jpg)'} />
          <div className='event-date-and-cost'>
            <div className='event-date'>
              <div className='event-date-number'>{ moment(this.props.item.startDateTime).date() }</div>
              <div className='event-date-month'>{ month[moment(this.props.item.startDateTime).month()-1] }</div>
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
            <div className='event-see-more'><Button className='item-btn-see-more' onClick={() => this.props.onExpand()}>See More <i className="fa fa-chevron-down" aria-hidden="true"></i></Button></div>
          }
        </Grid.Column>
      </Grid>
    )
  }

}

export default EventItemNotExpanded;
