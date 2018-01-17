import React, { Component } from 'react';
import { Grid, Button, Dimmer, Loader } from 'semantic-ui-react';
import styles from './eventitem.css';

import EventItemExpanded from './eventitemexpanded';
import EventItemNotExpanded from './eventitemnotexpanded';

class EventItem extends Component {

  render() {
    return (
      <Grid.Row style={{ paddingBottom: 0, paddingTop: 0, textAlign: 'left' }}>
        { this.props.item.isExpanding &&
          <Dimmer active inverted>
            <Loader />
          </Dimmer>
        }
        <Grid style={{ margin: 0, width: '100%' }}>
          <Grid.Column width={16} style={{
            padding: '0.6em 1em',
            backgroundColor: 'rgb(241, 241, 241)',
            borderTopLeftRadius: '5px',
            borderTopRightRadius: '5px',
            textAlign: 'left'
          }}>
            <Grid.Row style={{ fontSize: '14px' }}>
              <Grid>
                <Grid.Column width={1} style={{ color: 'rgb(112,112,112)' }}>
                  <i className='fa fa-hashtag'></i>
                </Grid.Column>
                <Grid.Column width={15}>
                  {this.props.item.topics && this.props.item.topics.map((topic, index) =>
                    (<span className='opp-topic-tag' key={this.props.item.itemId + '' + topic + index}>{topic}</span>)
                  )}
                </Grid.Column>
              </Grid>
            </Grid.Row>
          </Grid.Column>
        </Grid>
        { !this.props.item.expanded &&
          <EventItemNotExpanded item={this.props.item} onExpand={this.props.onExpand} />
        }
        { this.props.item.expanded &&
          <EventItemExpanded item={this.props.item} onShrink={this.props.onShrink} />
        }
      </Grid.Row>
    )
  }

}

export default EventItem;
