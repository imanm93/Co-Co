import React, { Component } from 'react';
import { Grid, Button, Label } from 'semantic-ui-react';
import moment from 'moment';

class EventItemExpanded extends Component {

  render() {
    const month = ["Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    return (
      <Grid style={{ margin: 0, width: '100%' }}>
        <Grid.Column width={16} style={{
          borderTopLeftRadius: '5px',
          borderTopRightRadius: '5px',
          padding: 0
        }}>
          <img className='event-image-expanded' src={this.props.item.photoUrl ? this.props.item.photoUrl : 'https://n6-img-fp.akamaized.net/free-photo/pink-wooden-surface-with-decorative-twigs_23-2147600605.jpg?size=338&ext=jpg)'} />
          <div className='event-date-and-cost'>
            <div className='event-date'>
              <div className='event-date-number'>{moment(this.props.item.startDateTime).date()}</div>
              <div className='event-date-month'>{month[moment(this.props.item.startDateTime).month() - 1]}</div>
            </div>
            <div className='event-cost'>{this.props.item.cost ? 'Paid' : 'Free'}</div>
          </div>
        </Grid.Column>
        <Grid.Column width={16} style={{ padding: '1em 2em 1em', backgroundColor: '#FFF' }}>
          <div className='event-title'>{this.props.item.title}</div>
          <div className='event-posted-by'>Posted by: <b className='event-posted-by-name'>{this.props.item.user.name}</b><span className='event-posted-time'>{this.props.item.displayDateTime}</span></div>
          <div className='event-attributes'>
            <div className='event-attribute'><i className="fa fa-hashtag" aria-hidden="true"></i> {this.props.item.type}</div>
            <div className='event-attribute'><i className='fa fa-clock-o' aria-hidden="true"></i>{moment(this.props.item.startDateTime).format("LLL")}</div>
            <div className='event-attribute'><i className="fa fa-map-marker" aria-hidden="true"></i> {this.props.item.location}</div>
          </div>
          <div className='item-dotted-line'></div>
          <div className='event-see-more'><Button className='item-btn-see-more' onClick={() => this.props.onShrink()}>See Less <i className="fa fa-chevron-up" aria-hidden="true"></i></Button></div>
          <div className='item-dotted-line' style={{ marginTop: 0 }}></div>
        </Grid.Column>
        <Grid.Column width={16} style={{ backgroundColor: '#FFF', padding: '0em 2em 2em' }}>
          <div className='event-description'>{this.props.item.description}</div>
          {this.props.item.attachments &&
            <Grid.Row>
              {this.props.item.attachments.map((attachment, index) => {
                return <Label as='a' href={attachment}>
                  {'Attachment ' + index}
                </Label>
              })}
            </Grid.Row>
          }
        </Grid.Column>

      </Grid>
    )
  }

}

export default EventItemExpanded;
