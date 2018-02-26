import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import moment from 'moment';

class OppItemNotExpanded extends Component {

  render() {
    return(
      <Grid.Row>
        <Grid.Column width={12}>
          <Grid.Row style={{ padding: '0.5em 1rem' }}>
            <div className='opp-service-needed' onClick={() => this.props.onExpand(this.props.type, this.props.item.itemId)}>{this.props.skills[this.props.item.serviceNeeded]}</div>
          </Grid.Row>
          <Grid.Row style={{ padding: '0.5em 1rem' }}>
            <div className='opp-title' onClick={() => this.props.onExpand(this.props.type, this.props.item.itemId)}>{this.props.item.title}</div>
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
            <Button className='item-btn-see-more' onClick={() => this.props.onExpand(this.props.type, this.props.item.itemId)}>See More <i className="fa fa-chevron-down" aria-hidden="true"></i></Button>
        </Grid.Column>
      </Grid.Row>      
    )
  }

}

export default OppItemNotExpanded;
