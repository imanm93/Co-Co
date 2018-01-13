import React, { Component } from 'react';
import { Button, Grid, Icon } from 'semantic-ui-react';
import styles from './oppitem.css';

class OppItem extends Component {

  getOppHeaderStyle(isExternal) {
    if (isExternal) return { padding: '0.6em 1em', marginBottom: '1rem', backgroundColor: '#F1F1F1', textAlign: 'left' }
    else return { padding: '0.6em 1em', marginBottom: '1rem', backgroundColor: '#F1F1F1', borderTopLeftRadius: '5px', borderTopRightRadius: '5px', textAlign: 'left' }
  }

  render() {
    const isExternal = this.props.item.companyDetails && this.props.item.companyDetails.contactEmail;
    const oppHeaderStyle = this.getOppHeaderStyle(isExternal);
    return (
      <Grid.Row style={{ padding: 0 }}>
        <Grid.Column width={16} style={{ padding: 0 }}>
          { this.props.item.companyDetails && this.props.item.companyDetails.contactEmail &&
              <Grid.Row className="opp-external-header"><b>External</b></Grid.Row>
          }
          <Grid.Row style={oppHeaderStyle}>
            <Grid>
              <Grid.Column width={4}>
                <div className='opp-type'>{this.props.item.type}</div>
              </Grid.Column>
              <Grid.Column width={1} style={{ paddingRight: 0, fontSize: '12px', textAlign: 'right' }}>
                <Icon name='hashtag' style={{ color: 'rgb(112,112,112)' }} />
              </Grid.Column>
              <Grid.Column width={11} style={{ paddingLeft: 0 }}>
                {this.props.item.topics && this.props.item.topics.map(topic =>
                  (<span className='opp-topic-tag' key={this.props.item.itemId + topic}>{topic}</span>)
                )}
              </Grid.Column>
            </Grid>
          </Grid.Row>
          <Grid.Row style={{ backgroundColor: '#FFF', padding: '0em 1em' }}>
            <Grid>
              <Grid.Column width={12}>
                <Grid.Row style={{ padding: '0.5em 1rem' }}>
                  <div className='opp-service-needed'>{this.props.skills[this.props.item.serviceNeeded]}</div>
                </Grid.Row>
                <Grid.Row style={{ padding: '0.5em 1rem' }}>
                  <div className='opp-title'>{this.props.item.title}</div>
                </Grid.Row>
                <Grid.Row style={{ padding: '0.5em 1em 1em', paddingTop: '0em' }}>
                  <Grid style={{ margin: 0 }}>
                    <Grid.Column width={2} style={{ padding: 0, paddingTop: '0.5em' }}>
                      { !this.props.item.companyDetails &&
                        <img className='opp-owner-picture' src={this.props.item.user.profilePhotoUrl} alt={'profile'} /> }
                      { this.props.item.companyDetails && !this.props.item.companyDetails.contactEmail &&
                        <img className='opp-owner-picture' src={this.props.item.user.profilePhotoUrl} alt={'profile'} /> }
                      { this.props.item.companyDetails && this.props.item.companyDetails.contactEmail &&
                        <img className='opp-owner-picture' src={this.props.item.companyDetails.logo} alt={'profile'} /> }
                    </Grid.Column>
                    <Grid.Column width={7} style={{ padding: 0, paddingTop: '0.75em' }}>
                      { !this.props.item.companyDetails &&
                        <div>
                          <div className='opp-owner-name'>{this.props.item.user.name}</div>
                          <div className='opp-owner-course-name'>{this.props.item.user.courseName}</div>
                        </div>
                      }
                      { this.props.item.companyDetails && !this.props.item.companyDetails.contactEmail &&
                        <div>
                          <div className='opp-owner-name'>{this.props.item.user.name}</div>
                          <div className='opp-owner-course-name'>{this.props.item.user.courseName}</div>
                        </div>
                      }
                      { this.props.item.companyDetails && this.props.item.companyDetails.contactEmail &&
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
                { !this.props.item.expanded &&
                    <Button className='item-btn-see-more' onClick={() => this.props.onExpand(this.props.type, this.props.item.itemId)}>See More <i className="fa fa-chevron-down" aria-hidden="true"></i></Button>
                }
              </Grid.Column>
            </Grid>
          </Grid.Row>
          <Grid.Row>
            { this.props.item.expanded &&
                <div>
                  <div>Description: {this.props.item.description}</div>
                  <div>Reward: {this.props.item.reward}</div>
                  <div>End Time: {this.props.item.endDateTime}</div>
                </div>
            }
          </Grid.Row>
        </Grid.Column>
      </Grid.Row>
    )
  }

}

export default OppItem;
