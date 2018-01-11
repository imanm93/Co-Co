import React, { Component } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import styles from './oppitem.css';

class OppItem extends Component {

  render() {
    return (
      <Grid.Row style={{ padding: 0 }}>
        <Grid.Column width={16} style={{ padding: 0 }}>
          { this.props.item.companyDetails.contactEmail &&
              <Grid.Row><b className="opp-external-header">External</b></Grid.Row>
          }
          <Grid.Row style={{ padding: '0.5rem', marginBottom: '1rem', backgroundColor: '#F1F1F1', borderTopLeftRadius: '5px', borderTopRightRadius: '5px', textAlign: 'left' }}>
            <Grid>
              <Grid.Column width={6}>
                <div className='opp-type'>{this.props.item.type}</div>
              </Grid.Column>
              <Grid.Column width={10}>
                {this.props.item.topics && this.props.item.topics.map(topic =>
                  (<span className='opp-topic-tag' key={this.props.item.itemId + topic}>#{topic}</span>)
                )}
              </Grid.Column>
            </Grid>
          </Grid.Row>
          <Grid.Row style={{ backgroundColor: '#FFF' }}>
            <Grid>
              <Grid.Column width={12}>
                <Grid.Row style={{ padding: '1rem' }}>
                  <div className='opp-title'>{this.props.item.title}</div>
                </Grid.Row>
                <Grid.Row style={{ padding: '1em 1em', paddingTop: '0em' }}>
                  <Grid>
                    <Grid.Column width={2} style={{ textAlign: 'right', paddingRight: 0 }}>
                      <img className='opp-owner-picture' src={this.props.item.user.profilePhotoUrl} alt={'profile'} />
                    </Grid.Column>
                    <Grid.Column width={4}>
                      <div className='opp-owner-name'>{this.props.item.user.name}</div>
                    </Grid.Column>
                    <Grid.Column width={4}>
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
