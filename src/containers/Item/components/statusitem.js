import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import styles from './statusitem.css';

class StatusItem extends Component {

  render() {
    return (
      <Grid.Row>
        <Grid style={{ padding: '0rem 1rem' }}>
          <Grid.Row style={{ padding: '0.5rem', backgroundColor: '#F1F1F1', borderTopLeftRadius: '5px', borderTopRightRadius: '5px', textAlign: 'left' }}>
            {this.props.item.topics && this.props.item.topics.map(topic =>
              (<span key={this.props.item.itemId + topic}># {topic}</span>)
            )}
          </Grid.Row>
          <Grid.Row style={{ backgroundColor: '#FFF', padding: 0 }}>
            <div className='status-body'>{this.props.item.text}</div>
          </Grid.Row>
          <Grid.Row style={{ backgroundColor: '#FFF', padding: 0 }}>
            <Grid.Column width={2}>
              <img className='status-owner-profile-picture' src={this.props.item.user.profilePhotoUrl} alt={'profile'} />
            </Grid.Column>
            <Grid.Column width={14}>
              <div className='status-owner-name'>{this.props.item.user.name}</div>
              <div className='status-time'>{this.props.item.displayDateTime}</div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Grid.Row>
    )
  }

}

export default StatusItem;
