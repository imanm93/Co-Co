import React, { Component } from 'react';
import { Grid, Button, Label, Icon } from 'semantic-ui-react';
import moment from 'moment';


class OppItemExpanded extends Component {

  render() {
    return(
      <Grid.Row>
        <Grid.Column width={12}>
          <Grid.Row style={{ padding: '0.5em 1rem' }}>
            <div className='opp-service-needed' onClick={() => this.props.onShrink(this.props.type, this.props.item.itemId)}>{this.props.skills[this.props.item.serviceNeeded]}</div>
          </Grid.Row>
          <Grid.Row style={{ padding: '0.5em 1rem' }}>
            <div className='opp-title' onClick={() => this.props.onShrink(this.props.type, this.props.item.itemId)}>{this.props.item.title}</div>
          </Grid.Row>
          <Grid.Row style={{ padding: '0.5em 1em 1em', paddingTop: '0em' }}>
            <Grid style={{ margin: 0 }}>
              <Grid.Column width={2} style={{ padding: 0, paddingTop: '0.5em' }}>
                {!this.props.item.companyDetails &&
                  <img className='opp-owner-picture' src={this.props.item.user.profilePhotoUrl} alt={'profile'} />}
                {this.props.item.companyDetails && !this.props.item.companyDetails.contactEmail &&
                  <img className='opp-owner-picture' src={this.props.item.user.profilePhotoUrl} alt={'profile'} />}
                {this.props.item.companyDetails && this.props.item.companyDetails.contactEmail &&
                  <img className='opp-owner-picture' src={this.props.item.companyDetails.logo} alt={'profile'} />}
              </Grid.Column>
              <Grid.Column width={7} style={{ padding: 0, paddingTop: '0.75em' }}>
                {!this.props.item.companyDetails &&
                  <div>
                    <div className='opp-owner-name'>{this.props.item.user.name}</div>
                    <div className='opp-owner-course-name'>{this.props.item.user.courseName}</div>
                  </div>
                }
                {this.props.item.companyDetails && !this.props.item.companyDetails.contactEmail &&
                  <div>
                    <div className='opp-owner-name'>{this.props.item.user.name}</div>
                    <div className='opp-owner-course-name'>{this.props.item.postOwnerCourse}</div>
                  </div>
                }
                {this.props.item.companyDetails && this.props.item.companyDetails.contactEmail &&
                  <div className='opp-owner-name'>{this.props.item.companyDetails.name}</div>
                }
              </Grid.Column>
              <Grid.Column width={7} style={{ padding: 0, paddingTop: '0.75em' }}>
                <div className='opp-time'>{this.props.item.displayDateTime}</div>
              </Grid.Column>
            </Grid>
          </Grid.Row>
        </Grid.Column>
        <Grid.Column width={4}>
            <Button className='item-btn-see-more' onClick={() => this.props.onShrink(this.props.type, this.props.item.itemId)}>See Less <i className="fa fa-chevron-up" aria-hidden="true"></i></Button>
        </Grid.Column>
        <Grid.Column width={16} style={{
          backgroundColor: '#FFF',
          padding: '0em 2em'
        }}>
          <Grid style={{
            margin: 0
          }}>
            <Grid.Row>
              {this.props.item.description}
            </Grid.Row>
            {(this.props.item.reward || this.props.item.endDateTime) &&
              <div className='event-attributes' style={{ paddingBottom: '2em' }}>
                {this.props.item.reward &&
                  <div className='event-attribute'><i className="fa fa-gift" aria-hidden="true"></i> {this.props.item.reward}</div>}
                {<div className='event-attribute'><i className='fa fa-clock-o'></i> {moment(this.props.item.endDateTime).format("LL")}</div>}
              </div>
            }
            {this.props.item.attachments &&
              <Grid.Row>
                {this.props.item.attachments.map((attachment, index) => {
                  let name = "Attachment "+ index;
                  if (attachment.name) { name = attachment.name; }
                  return <Label key={'opp' + this.props.item.itemId + 'attachement' + index} as='a' href={attachment.url}>
                    {attachment.url.split('/')[-1]} <Icon name='download' key={'opp' + this.props.item.itemId + 'attachementIcon' + index} onClick={()=>{this.onIconClick(attachment.url)}}/>
                  </Label>
                })}
              </Grid.Row>
            }
          </Grid>
        </Grid.Column>
      </Grid.Row>
    )
  }

}

export default OppItemExpanded;
