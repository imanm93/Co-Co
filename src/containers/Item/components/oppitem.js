import React, { Component } from 'react';
import { Button, Grid, Icon, Dimmer, Loader, Label } from 'semantic-ui-react';
import styles from './oppitem.css';
import moment from 'moment';

import OppItemExpanded from './oppitemexpanded';
import OppItemNotExpanded from './oppitemnotexpanded';

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
          {this.props.item.companyDetails && this.props.item.companyDetails.contactEmail &&
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
              {this.props.item.isExpanding &&
                <Dimmer active inverted>
                  <Loader />
                </Dimmer>
              }
              {this.props.item.expanded &&
                <OppItemExpanded
                  type={this.props.type}
                  item={this.props.item}
                  onShrink={this.props.onShrink}
                  skills={this.props.skills}
                />
              }
              {!this.props.item.expanded &&
                <OppItemNotExpanded
                  type={this.props.type}
                  item={this.props.item}
                  onExpand={this.props.onExpand}
                  skills={this.props.skills}
                />
              }
            </Grid>
          </Grid.Row>
        </Grid.Column>
      </Grid.Row>
    )
  }

}

export default OppItem;
