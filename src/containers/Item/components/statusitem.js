import React, { Component } from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import styles from './statusitem.css';

class StatusItem extends Component {

  render() {
    return (
      <Grid.Row style={{ paddingTop: 0, paddingBottom: 0 }}>
        <Grid style={{ width: '100%', margin: 0 }}>
          <Grid.Row style={{ padding: '0.6em 1em', backgroundColor: '#F1F1F1', borderTopLeftRadius: '5px', borderTopRightRadius: '5px', textAlign: 'left' }}>
            <Grid.Column width={1} style={{ paddingRight: 0, fontSize: '12px', textAlign: 'right' }}>
              <Icon name='hashtag' style={{ color: 'rgb(112,112,112)' }} />
            </Grid.Column>
            <Grid.Column width={15} style={{ paddingLeft: 0 }}>
              {this.props.item.topics && this.props.item.topics.map(topic =>
                (<span className='opp-topic-tag' key={this.props.item.itemId + topic}>{topic}</span>)
              )}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ backgroundColor: '#FFF', padding: 0 }}>
            <div className='status-body'>{this.props.item.text}</div>
          </Grid.Row>
          <Grid.Row style={{ backgroundColor: '#FFF', padding: '1em' }}>
            <Grid.Column width={2} style={{ paddingRight: 0, textAlign: 'right' }}>
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
